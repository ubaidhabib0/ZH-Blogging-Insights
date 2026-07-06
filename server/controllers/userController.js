exports.getProfile = async (req, res) => {

    res.json({

        success: true,

        user: req.user

    });

};

exports.adminDashboard = async (req, res) => {

    res.json({

        success: true,

        message: "Welcome Admin"

    });

};

exports.superAdminDashboard = async (req, res) => {

    res.json({

        success: true,

        message: "Welcome Super Admin"

    });

};