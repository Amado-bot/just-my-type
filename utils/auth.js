const withAuth = (req, res, next) => {
    console.log(req.session)
    if(!req.session.player_id){
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports = withAuth;