const alertMessage  = require('../helpers/alertMessage');
// 
const patientController = require('../controllers/patientController');
const doctorController = require('../controllers/doctorController');

exports.getIndex = async (req, res) => {
    
    const data = { title:'Home',message:undefined,user:res.locals.user  }
    res.redirect('clinics')
}
exports.getLogin = async (req, res) => {
    const data = { title:'Login',message:undefined,user:res.locals.user   }
    res.render('login',data)
}
exports.postLogin = async (req, res) => {
    
    const data = { title:'Login',message:undefined,user:res.locals.user   }
    if(!req.body.email ||!req.body.password || !req.body.type ){
        data.message =  alertMessage.alertMessage('error', 'Login Failed!', 'Login Failed!');
        res.render('login',data)
        return
    }
    if(req.body.type == 'Patient'){
         return patientController.checkLogin(req,res);
    }

    res.render('login')
}
exports.getRegister = async (req, res) => {
    
    const data = { title:'Register',message:undefined,user:res.locals.user   }
    res.render('register',data)
}

exports.postRegister = async (req, res) => {
    
    const data = { title:'Register',message:undefined,user:res.locals.user   }
    if(!req.body.email ||!req.body.password || !req.body.name ){
        data.message =  alertMessage.alertMessage('error', 'Register Failed', 'Register Failed, there are fields missing!');
        res.render('register',data)
        return
    }
         return patientController.createPatient(req,res);
}
exports.getLogout = async (req, res) => {
    res.clearCookie('jwt');     
    res.render('login');
}

exports.getResetUser = async (req, res) => {
    const data = { title:'Recover password',message:undefined,user:res.locals.user   }
    res.render('reset_password',data)
}

exports.postResetUser = async (req, res) => {
    const data = { title: 'Recover password', message: undefined, user: res.locals.user }
    if (!req.body.email || !req.body.password || !req.body.type) {
        data.message = alertMessage.alertMessage('error', 'Recover Failed!', 'Recover Failed!');
        res.render('reset_password', data)
        return
    }
    if (req.body.type == 'Patient') {
        return patientController.resetPassword(req, res);
    }
 
}