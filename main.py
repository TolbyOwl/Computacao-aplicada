from flask import Flask, render_template, request, redirect
from supabase import create_client, Client
from dotenv import load_dotenv
import os

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
            # return render_template('teste.html', posts=posts.data)
    return render_template('home.html')


if __name__ == '__main__':
    app.run(debug=True)


