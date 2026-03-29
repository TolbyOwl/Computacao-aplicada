from flask import Flask, jsonify
from flask_cors import CORS
import os
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Habilita CORS para todas as rotas
    CORS(app)

    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "healthy", "message": "API Acolhimento está online!"}), 200

    # Inicializar as Rotas (Blueprints)
    # from routes.auth_routes import auth_bp
    # from routes.patient_routes import patient_bp
    # from routes.appointment_routes import appointment_bp
    #
    # app.register_blueprint(auth_bp, url_prefix='/api/auth')
    # app.register_blueprint(patient_bp, url_prefix='/api/patients')
    # app.register_blueprint(appointment_bp, url_prefix='/api/appointments')

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    # debug=True em desenvolvimento
    app.run(host='0.0.0.0', port=port, debug=True)
