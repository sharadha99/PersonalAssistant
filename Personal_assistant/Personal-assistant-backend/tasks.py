import MySQLdb
class TASKS:
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
    
    def gettasks(self,t):
        self.db_connect()
        tasks = []
        for tid in t:
            self.cur.execute("select * from task where t_id = {0} ".format(tid))
            tasks.append(self.cur.fetchall()[0])
        task_objects=[]
        if len(tasks)==0:
            return task_objects
        for t_id,t_date,t_time,t_type,t_venue in tasks:
            task_objects.append({'t_id':t_id, 't_date':t_date, 't_time':t_time, 't_type':t_type,'t_venue':t_venue})
        return task_objects
    
    def delete(self,id):
        self.db_connect()
        
        self.cur.execute("delete from task where t_id = {0}".format(id))
        self.conn.commit()
       
    def size(self):
        self.db_connect()
        entries=self.cur.execute("select * from task")
        return entries
    
    def check_date(self,date):
        self.db_connect()
        
        entries=self.cur.execute("select * from event where t_date = '{0}' ".format(date))
        if(entries==1):
            return True
        else:
            return False
    def insert(self,data,tid):
        self.db_connect()
        
        self.cur.execute("INSERT into event(t_id,t_date,t_time,t_type,t_venue) VALUES('{0}' , '{1}' , '{2}' , '{3}' , '{4}')".format(data['t_id'],data['t_date'],data['t_time'],data['t_type'],data['t_venue']))
        self.conn.commit()    
    
