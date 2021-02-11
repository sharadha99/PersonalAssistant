import MySQLdb
class TASK_USER:
    def __init__(self):
        self.host = '127.0.0.1'                
        self.user = 'root'
        self.pswd = 'root'
        self.db = 'taskmgmt'
        self.conn = None
        self.cur = None
    def db_connect(self):
        self.conn = MySQLdb.connect(user=self.user, password=self.pswd,host=self.host,database=self.db)
        self.cur = self.conn.cursor()
        
    def getevents(self,uid):
        self.db_connect()
        
        self.cur.execute("select * from task_user where uid = {0}".format(uid))
        tasks = self.cur.fetchall()
        t =[]
        for t_id, uid in events:
            t.append(t_id)
        return t
        
    def delete(self,tid):
        self.db_connect()
        
        self.cur.execute("delete from task_user where t_id = {0}".format(tid))
        self.conn.commit()
        
    def insert(self,tid,uid):
        self.db_connect()
        
        self.cur.execute("insert into task_user(t_id,uid) values({0},{1})".format(tid,uid))
        self.conn.commit()
       
    
   
