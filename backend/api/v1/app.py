from config import db, app
from api.v1.views import app_view
from models import storage

# class imports
from models.user import User
from models.playlist import Playlist
from models.track import Track

app.register_blueprint(app_view)


@app.teardown_appcontext
def teardown_db(exception):
    storage.close()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
