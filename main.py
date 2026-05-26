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
        nome = request.form.get('appt-name')
        sobrenome = request.form.get('appt-lastname')
        telefone_ddd = request.form.get('appt-ddd')
        telefone = request.form.get('appt-phone')
        telefone_adicional= request.form.get('appt-phone-alternative')
        email = request.form.get('appt-email')
        horario_da_consulta = request.form.get('appt-time')
        data = request.form.get('appt-date')
        tipo_consulta = request.form.get('appt-service')

        agendamento_existente = supabase.table('Notificacao').select('telefone').eq('telefone', telefone).eq('data', data).execute()
        try:
            if agendamento_existente.data:
                mensagem='Agendamento já existente para este email. Inicie sessão para gerenciar!'
                return jsonify({"status": "fail", "data": request.form, "message": mensagem})
        except AttributeError:
            return jsonify({"status": "fail", "data": request.form, "message": "Erro ao criar agendamento."})
        else:
            supabase.table('Notificacao').insert({'nome': nome, 'sobrenome': sobrenome,\
           'data': data, 'horario_da_consulta': horario_da_consulta, 'tipo_consulta': tipo_consulta, 'telefone_adicional': telefone_adicional, 'telefone': telefone, 'ordem_pedido' : 1}).execute()
            # posts = supabase.table('Notificacao').select('*').order('created_at', desc=True)\
            # .execute()
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
            crp = supabase.table("Psicologo").select('crp').eq('user_uuid',session["user_id"]).execute()
            session["crp"] = crp.data[0]['crp']
            session["first_name"] = response.user.user_metadata.get("first_name")
            session["last_name"] = response.user.user_metadata.get("last_name")
            # print(session.google_access_token)
            return redirect(url_for("dash"))
        else:
            return render_template("login.html", error="Falha ao iniciar sessão. O e-mail ou senha é inválido.")
    if request.method == 'GET':
        return render_template("login.html")


#funções de dashboard
@app.route("/dashboard", methods=['POST', 'GET'])
def dash():
    if "user" not in session:
        return redirect(url_for("login"))
    if request.method=="POST":
        event_data = {
            'paciente' : request.form['pacient'],
            'data' : request.form['date'],
            'horario' : request.form['time'],
            'duracao' : request.form['duration'],
            'recorrencia' : request.form['recurrent']
        } 
        agenda.add_event(access_token=session['google_access_token'],event_data=event_data)
        return redirect(url_for("dash"))
    notifications_pending = supabase.table('Notificacao').select('*').eq('status', "Pendente").order('created_at', desc=True).execute()
    crp = session['crp']
    pacients = supabase.table('Cliente').select('*').eq('crp', crp).eq('Status',"ativo").order('created_at', desc=True).execute()
    next_event = agenda.next_event(access_token=session['google_access_token'])
    return render_template("dashboard.html", user=session["first_name"], notifications_pending = notifications_pending.data, next_event=next_event,pacients=pacients.data)

@app.route("/clients", methods=['POST', 'GET'])
def clients():
    crp = session['crp']
    if request.method == "POST":
        nome = request.form["name"]
        sobrenome = request.form["last_name"]
        telefone = request.form["telefone"]
        telefone_adicional = request.form["telefone_adicional"]
        status = request.form["status"]
        supabase.table('Cliente').insert({'Nome': nome, 'Sobrenome': sobrenome,\
            'telefone': telefone, 'telefone_adicional': telefone_adicional, 'crp' : crp, 'Status' : status}).execute()
        return redirect(url_for("clients"))
    if "user" not in session:
        return render_template("login.html")
    pacients = supabase.table('Cliente').select('*').eq('crp', crp).order('created_at', desc=True).execute()
    return render_template("clients.html", pacients = pacients.data)

@app.route("/client/<pacient_id>", methods=['POST','GET'])
def edit_pacient(pacient_id): 
    pacient = supabase.table('Cliente').select('*').eq('id', pacient_id).single().execute()
    if request.method=="POST":
        nome = request.form["name"]
        sobrenome = request.form["last_name"]
        telefone = request.form["telefone"]
        telefone_adicional = request.form["telefone_adicional"]
        status = request.form["status"]
        supabase.table('Cliente').update({'Nome': nome, 'Sobrenome': sobrenome,\
            'telefone': telefone, 'telefone_adicional': telefone_adicional, 'Status' : status}).\
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

#Função de teste para alterar itens que e testar
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

#aceitar e negar consultas

@app.route("/handle_notification", methods=['POST'])
def handle_notification():
    notification_id = request.json.get("id")
    action = request.json.get("action")
    crp = session['crp']
    if action == "aceita":
        supabase.table('Notificacao').update({'status': "Aceito"}).eq('id', notification_id).execute()
        notification_content=supabase.table('Notificacao').select('*').eq('id', notification_id).single().execute()
        data=notification_content.data
        supabase.table('Cliente').insert({'crp': crp,'Nome' : data['nome'],'Sobrenome' : data['sobrenome'],'telefone' : data['telefone'],'telefone_adicional' : data['telefone_adicional'], 'Status' : 'ativo'}).execute()
        return jsonify({"status": "success", "message": "Consulta aceita."})
    elif action == "rejeitada":
        supabase.table('Notificacao').update({'status': "Recusado"}).eq('id', notification_id).execute()
        return jsonify({"status": "success", "message": "Consulta recusada."})
    else:
        return jsonify({"status": "fail", "message": "Ação inválida."})

#Funções da Agenda

def get_credentials():
    if "google_access_token" in session:
        google_access_token = session["google_access_token"]
        return google_access_token
    else:
        authenticate_google()


#Obter eventos do dia selecionado
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


#Obter evento especifico quando clicar para ver detalhes
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

#Deletar um evento
@app.route("/delete_event/<string:event_id>", methods=['GET'])
def delete_event(event_id):
    agenda.delete_event(access_token=session["google_access_token"], event_id=event_id)
    return redirect("/dashboard")


# NOTAS

@app.route("/notes",methods=['GET'])
def notes():
    crp = session['crp']
    pacients = supabase.table('Cliente').select('*').eq('crp', crp).order('created_at', desc=True).execute()
    return render_template("notes.html", pacients=pacients.data)

@app.route("/take_note",methods=['GET'])
def take_note():
    return render_template("take_note.html")


#Execução
if __name__ == '__main__':
    app.run(debug=True)