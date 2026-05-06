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
        # telefone_ddd = request.form['DDD']
        # telefone = request.form['Telefone']
        email = request.form.get('appt-email')
        # horario_da_consulta = request.form['Horario']
        data = request.form.get('appt-date')
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
           'email': email, 'data': data}).execute()
            posts = supabase.table('Notificacao').select('*').order('created_at', desc=True)\
            .execute()
            return jsonify({"status": "success", "data": request.form})
    if request.method == 'GET':
        return render_template('home.html')

#Itens De/Pós login

#Tem que ver se precisa desse redirecionamento ao clicar em login

@app.route("/registrar", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]
        first_name = request.form["name"]
        last_name = request.form["lastname"]
        confirm_password = request.form["confirm_password"]

        if password != confirm_password:
            return render_template("new_account.html", error="As senhas não coincidem.")

        response = supabase.auth.sign_up(\
            {"email": email, "password": password, "options": {"data": {"first_name": first_name, "last_name": last_name}}})

        if response.user:
            return redirect(url_for("login"))
        else:
            return render_template("new_account.html", \
                                   error="Falha ao criar conta. Tente novamente.")
    return render_template("new_account.html")

@app.route("/login", methods=['POST','GET'])
def login():
    if "user" in session:
        print(session["user_id"])
        return redirect(url_for("dash"))
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        response = supabase.auth.sign_in_with_password({"email": email, "password": password})

        if response.user:
            session["user"] = response.user.email
            try:
                session["google_access_token"] = response.user.user_metadata.get("google_access_token")
            except:
                session["google_access_token"] = None
            session["user_id"] = response.user.id
            session["first_name"] = response.user.user_metadata.get("first_name")
            print(session["user_id"])
            # print(session.google_access_token)
            return redirect(url_for("dash"))
            print(response) #Usar isso para descobrir quais informações vem no login
        else:
            return render_template("login.html", error="Falha ao iniciar sessão. O e-mail ou senha é inválido.")
    if request.method == 'GET':
        return render_template("login.html")

@app.route("/dashboard")
def dash():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html", user=session["user"])

@app.route("/logout")
def logout():
    session.pop("user", None)
    supabase.auth.sign_out()
    return redirect(url_for("login"))

@app.route ("/teste",methods=['POST','GET'])
def default():
    if session["google_access_token"] is None:
        authenticate_google()
    return render_template("home(old).html", test=session["google_access_token"])

#Funções da Agenda

def get_credentials():
    if "google_access_token" in session:
        google_access_token = session["google_access_token"]
        return google_access_token
    else:
        authenticate_google()

def get_events(): 
    try:
        token = supabase.auth.get_user().raw_user_metadata.access_token
        if token:
            events = agenda.main(access_token=token)
            return jsonify({"status": "success", "events": events})    
    except:
        authenticate_google()

def authenticate_google():
    try:
        token = supabase.auth.admin.get_user_by_id(session["user_id"]).user_metadata.get("google_access_token")
    except:
        google_access_token = None
        token = agenda.obtain_credentials(google_access_token)
        print(token)
        supabase.auth.admin.update_user_by_id(session["user_id"], attributes={"user_metadata": {"google_access_token": token}})
    if token:
        session["google_access_token"] = token   
        return jsonify({"status": "success", "message": "Autenticação bem-sucedida com a conta Google."})
    else: 
        return jsonify({"status": "fail", "message": "Falha na autenticação com a conta Google."})


#Execução
if __name__ == '__main__':
    app.run(debug=True)