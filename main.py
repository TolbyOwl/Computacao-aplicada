import token

from click import option
from flask import Flask, render_template, request, redirect,  url_for, session, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import agenda

load_dotenv() #Carrega a auteticação do supabase a partir do arquivo .env
url=os.getenv("SUPABASE_URL")
key=os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)
app.secret_key = os.getenv("secret_key")  # Change this to a secure key


#Funções da página inicial

@app.route("/",methods=['POST', 'GET']) #Página inicial do site, onde o usuário irá escolher o tipo de consulta que deseja realizar
def home():
    if request.method == 'POST': #Tem que adicionar e verificação de token aqui, para não duplicar adições ao recarregar a página
        print(request.form)
        nome_cliente = request.form.get('appt-name')
        sobrenome_cliente = request.form.get('appt-lastname')
        telefone_ddd = request.form.get('appt-ddd')
        telefone = request.form.get('appt-phone')
        email = request.form.get('appt-email')
        horario_da_consulta = request.form.get('appt-time')
        data = request.form.get('appt-date')
        tipo_consulta = request.form.get('appt-service')
        print(nome_cliente, sobrenome_cliente, email, data)
        agendamento_existente = supabase.table('Notificacao').select('email').eq('email', email).eq('data', data).execute()
        try:
            if agendamento_existente.data:
                mensagem='Agendamento já existente para este email. Inicie sessão para gerenciar!'
                return jsonify({"status": "fail", "data": request.form, "message": mensagem})
        except AttributeError:
            return jsonify({"status": "fail", "data": request.form, "message": "Erro ao criar agendamento."})
        else:
            supabase.table('Notificacao').insert({'nome_cliente': nome_cliente, 'sobrenome_cliente': sobrenome_cliente,\
           'email': email, 'data': data, 'horario_da_consulta': horario_da_consulta, 'tipo_consulta': tipo_consulta, 'telefone_ddd': telefone_ddd, 'telefone': telefone, 'ordem_pedido' : 1}).execute()
            posts = supabase.table('Notificacao').select('*').order('created_at', desc=True)\
            .execute()
            return jsonify({"status": "success", "data": request.form})
    if request.method == 'GET':
        if "user" in session:
            message = "Olá, " + session["first_name"] + "!"
            return render_template('home.html', message=message)
        return render_template('home.html', message = "Iniciar sessão")

#Itens De/Pós login

@app.route("/registrar", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        first_name = request.form["name"]
        last_name = request.form["lastname"]
        confirm_password = request.form["confirm_password"]
        crp = request.form['crp']

        if password != confirm_password:
            return render_template("new_account.html", error="As senhas não coincidem.")

        response = supabase.auth.sign_up(\
            {"email": email, "password": password, "options": {"data": {"first_name": first_name, "last_name": last_name}}})

        if response.user:
            supabase.table("Psicologo").insert({'nome': first_name, 'sobrenome' : last_name,'user_uuid' : response.user.id, 'crp' : crp}).execute()
            return redirect(url_for("login"))
        else:
            return render_template("new_account.html", \
                                   error="Falha ao criar conta. Tente novamente.")
    return render_template("new_account.html")

@app.route("/login", methods=['POST','GET'])
def login():
    if "user" in session:
        return redirect(url_for("dash"))
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        try:
            response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        except:
            return render_template("login.html", message="Usuário ou senha inválido")
        if response.user:
            session["user"] = response.user.email
            try:
                session["google_access_token"] = response.user.user_metadata.get("google_access_token")
            except:
                session["google_access_token"] = None
            session["user_id"] = response.user.id
            session["first_name"] = response.user.user_metadata.get("first_name")
            session["last_name"] = response.user.user_metadata.get("last_name")
            # print(session.google_access_token)
            return redirect(url_for("dash"))
        else:
            return render_template("login.html", error="Falha ao iniciar sessão. O e-mail ou senha é inválido.")
    if request.method == 'GET':
        return render_template("login.html")

@app.route("/dashboard", methods=['POST', 'GET'])
def dash():
    if "user" not in session:
        return redirect(url_for("login"))
     #definir prioridade com uma variavel
    # psicologo_type = supabase.table('Psicologo').select('tipo_consulta').eq('user_uuid',session["user_id"]).execute()
    notifications_pending = supabase.table('Notificacao').select('*').eq('status', "Pendente").order('created_at', desc=True).execute()
    return render_template("dashboard.html", user=session["first_name"], notifications_pending = notifications_pending.data)

@app.route("/clients", methods=['POST', 'GET'])
def clients():
    if request.method == "POST":
        nome = request.form["name"]
        sobrenome = request.form["last_name"]
        telefone_ddd = request.form["telefone_ddd"]
        telefone = request.form["telefone"]
        telefone_ddd_adicional = request.form["telefone_ddd_adicional"]
        telefone_adicional = request.form["telefone_adicional"]
        status = request.form["status"]
        crp = supabase.table('Psicologo').select('crp').eq('user_uuid', session["user_id"]).execute()
        supabase.table('Cliente').insert({'Nome': nome, 'Sobrenome': sobrenome,\
            'telefone_ddd': telefone_ddd, 'telefone': telefone, 'telefone_ddd_adicional': telefone_ddd_adicional, 'telefone_adicional': telefone_adicional, 'crp' : crp.data[0]['crp'], 'Status' : status}).execute()
        return redirect(url_for("clients"))
    if "user" not in session:
        return render_template("login.html")
    crp = supabase.table('Psicologo').select('crp').eq('user_uuid', session["user_id"]).execute()
    pacients = supabase.table('Cliente').select('*').eq('crp', crp.data[0]['crp']).order('created_at', desc=True).execute()
    return render_template("clients.html", pacients = pacients.data)

@app.route("/client/<pacient_id>", methods=['POST','GET'])
def edit_pacient(pacient_id): 
    pacient = supabase.table('Cliente').select('*').eq('id', pacient_id).single().execute()
    if request.method=="POST":
        nome = request.form["name"]
        sobrenome = request.form["last_name"]
        telefone_ddd = request.form["telefone_ddd"]
        telefone = request.form["telefone"]
        telefone_ddd_adicional = request.form["telefone_ddd_adicional"]
        telefone_adicional = request.form["telefone_adicional"]
        status = request.form["status"]
        supabase.table('Cliente').update({'Nome': nome, 'Sobrenome': sobrenome,\
            'telefone_ddd': telefone_ddd, 'telefone': telefone, 'telefone_ddd_adicional': telefone_ddd_adicional, \
                'telefone_adicional': telefone_adicional, 'Status' : status}).\
                eq('id', pacient_id).execute()
        return redirect("/clients")
    return render_template("client_data.html",pacient = pacient.data)


@app.route("/autenticar_agenda")
def authenticate_google():
    try:
        token = supabase.auth.admin.get_user_by_id(session["user_id"]).user.user_metadata.get("google_access_token")
        return render_template("dashboard.html", user=session["first_name"], message="Conta Google já vinculada.")
    except:
        google_access_token = None
        token = agenda.obtain_credentials(google_access_token)
        supabase.auth.admin.update_user_by_id(session["user_id"], attributes={"user_metadata": {"google_access_token": token}})
    if token:
        session["google_access_token"] = token   
        return render_template("dashboard.html", user=session["first_name"], message="Conta Google vinculada com sucesso!")
    else: 
        return render_template("dashboard.html", user=session["first_name"], message="Falha na autenticação com a conta Google. Tente novamente.")

@app.route("/logout")
def logout():
    session.pop("user", None)
    supabase.auth.sign_out()
    return redirect(url_for("login"))

@app.route ("/teste",methods=['POST','GET'])
def default():
    # if session["google_access_token"] is None:
    #     authenticate_google()        
    google_access_token = None
    token = agenda.obtain_credentials(google_access_token)
    print(session["user_id"])
    supabase.auth.admin.update_user_by_id(session["user_id"], attributes={"user_metadata": {"google_access_token": token}})
    if token:
        session["google_access_token"] = token       
        return render_template("home(old).html", test=token)

#Funções adicionais

#Funções da Agenda

def get_credentials():
    if "google_access_token" in session:
        google_access_token = session["google_access_token"]
        return google_access_token
    else:
        authenticate_google()

@app.route("/get_events", methods=['POST'])
def get_events():
    dateStr = request.json.get("dateStr")
    print(dateStr)
    try:
        if "google_access_token" not in session:
            session["google_access_token"] = supabase.auth.admin.get_user_by_id(session["user_id"]).user.user_metadata.get("google_access_token")
        if "google_access_token" in session:
            events = agenda.get_events(access_token=session["google_access_token"], dateStr=dateStr)
            return events
    except:
        return jsonify({"status": "fail", "message": "Víncule sua conta Google para acessar os eventos no calendário."})

@app.route("/event/<string:event_id>", methods=['POST','GET'])
def edit_event(event_id): 
    if request.method=="POST":
        pass
    if request.method=="GET":
        try:
            if "google_access_token" not in session:
                session["google_access_token"] = supabase.auth.admin.get_user_by_id(session["user_id"]).user.user_metadata.get("google_access_token")
            if "google_access_token" in session:  
                event_details = agenda.get_specific_event(access_token=session["google_access_token"], event_id=event_id)
                return render_template("event_data.html", event=event_details)
        except:
            return jsonify({"status": "fail", "message": "Víncule sua conta Google para acessar os eventos no calendário."})



#Execução
if __name__ == '__main__':
    app.run(debug=True)