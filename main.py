from flask import Flask, jsonify, request
from flask_cors import CORS
from user import USER
from tasks import TASKS
from payment import PAYMENT
from rec_task import RECIEPT_TASK
from task_use import TASK_USER
app = Flask(__name__)
app.config.update(
    
    #Set the secret key to a sufficiently random value
    SECRET_KEY=os.urandom(24),
    #Set the session cookie to be secure
    SESSION_COOKIE_SECURE=True,
    #Set the session cookie for our app to a unique name
    SESSION_COOKIE_NAME='YourAppName-WebSession',
    #Set CSRF tokens to be valid for the duration of the session. This assumes you’re using WTF-CSRF protection
    WTF_CSRF_TIME_LIMIT=None
)

CORS(app)
U = USER()
T = TASKS()
T_U = TASK_USER()
Uid = None
@app.route("/register", methods=["POST"])                       
def register():
    payload = request.json
    if U.search(payload['uid'])==True:
        return jsonify({'success':False})
    else:
        U.insert(payload)
        return jsonify({'success':True})

@app.route("/login",methods=["POST"])
def login():
	payload = request.json
	print(payload)

	if U.search(payload['id'])==True and U.pwd(payload['id'])==payload['passwd'] :
		session['logged_in'] = True
        print(session['logged_in'])
        Uid=payload['id']
		print(Uid)
		return jsonify({'success':True})
	else:
		return jsonify({'success':False})
        
@app.route("/userhome",methods=["GET"])
def userhome():
	print(Uid)
	t = T_U.gettasks(Uid)	
	all_tasks = E.gettasks(t)
	return jsonify({'tasks':all_tasks, 'success':True,'uid':Uid})
    
@app.route("/delete-task",methods=["POST"])
def delete_task():
    payload = request.json 
    id = payload["id"]
    T.delete(id)
    T_U.delete(id)
    return jsonify({'success':True})
    
@app.route("/addtask",methods=["POST"])
def add_task():
    payload = request.json
    tid = T.size()+1
    if T.check_date(payload['t_date']) == True:
        return jsonify({'success':False})
    T.insert(payload,tid)
    T_U.insert(tid,payload['uid'])
    return jsonify({'success': True})


@app.route("/logout")
def logout():
    session['logged_in'] = False
    print(session['logged_in'])
    return redirect(url_for('login'))

if __name__ == "__main__":
  app.run(debug=True, port="5000") 
