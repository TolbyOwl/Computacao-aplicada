from flask import Flask, render_template, request
from supabase import create_client, Client
from dotenv import load_dotenv
import os

load_dotenv() #Carrega a auteticação do supabase a partir do arquivo .env
url=os.getenv("SUPABASE_URL")
key=os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

app = Flask(__name__)

@app.route("/",methods=['POST', 'GET']) #Página inicial do site, onde o usuário irá escolher o tipo de consulta que deseja realizar
def home():
    if request.method == 'POST':
        nome = request.form['Nome']
        sobrenome = request.form['Sobrenome']
        ddd = request.form['DDD']
        telefone = request.form['Telefone']
        email = request.form['Email']
        horario = request.form['Horario']
        supabase.table('Notificacao').insert({'nome_cliente': nome, 'sobrenome_cliente': sobrenome, 'telefone_ddd': ddd, 'telefone': telefone, 'email': email, 'horario_da_consulta': horario}).execute()
        #Adicionar verificação para ver se o cliente já tem conta, caso tenha, direcionar para a página de login
        posts = supabase.table('Notificacao').select('*').order('created_at', desc=True)\
        .execute()
        return render_template('teste.html', posts=posts.data)
    return render_template('home.html')
    print("Hello World")


if __name__ == '__main__':
    app.run(debug=True)


