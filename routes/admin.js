const router = require('express').Router()
const passport = require("passport")
const { Admin, Patients } = require("../models")


router.get('/', (req, res) => {
    res.render('adminLogin.ejs')
})

router.post('/', (req, res) => {
    // Admin.register({ username: req.body.username }, req.body.password)
    //     .then((admin) => {
    //         passport.authenticate("local")(req, res, () => {
    //             res.redirect('/')
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })

    const admin = new Admin({
        username: req.body.username,
        password: req.body.password
    })

    req.login(admin, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/api/admin/home")
            })
        }
    })


})

router.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        res.render("home.ejs")
    }
    else {
        res.redirect("/")
    }
})

router.get("/register", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("register.ejs")
    } else {
        res.redirect('/')
    }
})

router.post('/register', (req, res) => {
    const patient = new Patients(req.body)
    patient.save().then(() => {
        res.render("success.ejs", {
            subTitle: "Success",
            subject: "added"
        })
    })
})

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/')
        }
    })
})

router.get("/search", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("search.ejs", {
            option: "Search",
            buttonName: "search",
            url: "search"
        })
    }
    else {
        res.render("/")
    }
})

router.post("/search", (req, res) => {
    Patients.findOne({ patient_id: req.body.patient_id }).then((data) => {
        if (data) {
            res.render("searchResults.ejs", data)
        }
        else {
            res.render("searchFailure.ejs", {
                url: "search"
            })
        }
    })
})

router.get("/update", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("search", {
            option: "Update",
            buttonName: "update",
            url: "update"
        })
    }
    else {
        res.redirect('/')
    }
})

router.post("/update", (req, res) => {
    Patients.findOne({ patient_id: req.body.patient_id }).then((data) => {
        if (data) {
            res.render("updatePage", data)
        }
        else {
            res.render("searchFailure", {
                url: "update"
            })
        }
    })
})

router.post('/updateResults', (req, res) => {
    try {
        Patients.findOneAndUpdate({ patient_id: req.body.patient_id }, req.body).then(() => {
            res.render("success.ejs", {
                subTitle: "Updated",
                subject: "update"
            })
        })
    }
    catch (err) {
        res.json({ msg: err.message })
    }
})

router.get("/delete", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("search.ejs", {
            option: "Delete",
            buttonName: "Delete",
            url: "delete"
        })
    }
    else {
        res.redirect('/')
    }
})

router.post('/delete', (req, res) => {
    Patients.findOneAndDelete({ patient_id: req.body.patient_id }).then((data) => {
        if (data) {
            res.render("success.ejs", {
                subTitle: "Deleted",
                subject: "delete"
            })
        }
        else {
            res.render('searchFailure', {
                url: "delete"
            })
        }
    })
})

router.get('/all', async (req, res) => {

    const allPatients = await Patients.find()
    res.send(allPatients)
})

module.exports = router