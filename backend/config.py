import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'minha_chave_super_secreta_aqui'
    SUPABASE_URL = os.environ.get('SUPABASE_URL')
    SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
    # Adicione outras configurações globais aqui
