from flask import Flask, render_template, request, redirect,  url_for, session
from supabase import create_client, Client
from dotenv import load_dotenv
import os
import agenda

load_dotenv() #Carrega a auteticação do supabase a partir do arquivo .env
url=os.getenv("SUPABASE_URL")
key=os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)


#Funções da página inicial

@app.route("/",methods=['POST', 'GET']) #Página inicial do site, onde o usuário irá escolher o tipo de consulta que deseja realizar
def home():
    if request.method == 'POST': #Tem que adicionar e verificação de token aqui, para não duplicar adições ao recarregar a página
        nome_cliente = request.form['Nome']
        sobrenome_cliente = request.form['Sobrenome']
        telefone_ddd = request.form['DDD']
        telefone = request.form['Telefone']
        email = request.form['Email']
        horario_da_consulta = request.form['Horario']
        agendamento_existente = supabase.table('Notificacao').select('email').eq('email', email).execute()
        try:
            if agendamento_existente.data:
                return render_template('home.html', mensagem='Agendamento já existente para este email. Inicie sessão para gerenciar!')
        except AttributeError:
            supabase.table('Notificacao').insert({'nome_cliente': nome_cliente, 'sobrenome_cliente': sobrenome_cliente,\
            'telefone_ddd': telefone_ddd, 'telefone': telefone, 'email': email, 'horario_da_consulta': horario_da_consulta}).execute()
            posts = supabase.table('Notificacao').select('*').order('created_at', desc=True)\
            .execute()
            #Adicionar um mensagem de sucesso e perguntando se o cliente quer cadastrar
    return render_template('home.html')

#Execução
if __name__ == '__main__':
    app.run(debug=True)




#Itens De/Pós login

#Tem que ver se precisa desse redirecionamento ao clicar em login
@app.route("/login")
def home():
    if "user" in session:
        return redirect(url_for("dashboard"))
    return redirect(url_for("login"))

@app.route("/registrar", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        response = supabase.auth.sign_up(\
            {"email": email, "password": password})

        if response.user:
            return redirect(url_for("login"))
        else:
            return render_template("register.html", \
                                   error="Registration failed. Try again.")
    return render_template("registrar.html")

@app.route("/login", methods=['POST','GET'])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        response = supabase.auth.sign_in_with_password({"email": email, "password": password})

        if response.user:
            session["user"] = response.user.email
            return redirect(url_for("dashboard"))
        else:
            return render_template("login.html", error="Falha ao iniciar sessão. O e-mail ou senha é inválido.")
    return render_template("login.html")

@app.route("/dashboard")
def dash():
    if "user" not in session:
        return redirect(url_for("login"))
    return render_template("dashboard.html", user=session["user"])

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("login"))

@app.route ("/psicologos",method=['POST','GET'])
def default():
    agenda.main()