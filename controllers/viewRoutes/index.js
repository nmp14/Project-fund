const router = require("express").Router();
const checkAuth = require("../../middlewares");
const Project = require("../../models/Project");
const User = require("../../models/User");

// handle homepage
router.get("/", async (req, res) => {
    try {
        const dbProjectData = await Project.findAll({
            include: [
                {
                    model: User,
                },
            ],
        });

        const projects = dbProjectData.map((project) => project.get({ plain: true }));

        res.render('all', {
            projects,
            loggedIn: req.session.loggedIn,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Get specific project by id
router.get("/project/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const projectData = await Project.findByPk(id, {
            include: [
                {
                    model: User
                }
            ]
        });

        const project = projectData.get({ plain: true })

        res.render("project", {
            project,
            loggedIn: req.session.loggedIn
        });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Get profile for loggedIn user. Needs authentication check
router.get("/profile", checkAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: {
                model: Project
            }
        })

        user = userData.get({ plain: true });

        res.render("profile", {
            user,
            loggedIn: req.session.loggedIn,
            user_id: req.session.user_id
        })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.get("/addProject", checkAuth, async (req, res) => {
    try {
        res.render("add-project", {
            loggedIn: req.session.loggedIn
        });
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
})

// Login page by /login
router.get("/login", async (req, res) => {
    try {
        res.render("login", {
            loggedIn: req.session.loggedIn
        })
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

module.exports = router;