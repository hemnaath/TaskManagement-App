const db = require('../config/sqlConnector');


const createProject = async(req, res)=>{
    const {projectName} = req.body;
    try{
        const finderSql = `SELECT id FROM project WHERE projectName = ?`;
        db.query(finderSql, [projectName], (err, exists)=>{
            if(exists.length > 0){
                return res.status(409).json({message:'Record exists'});
            }else{
                const orgIdFinderSql = `SELECT orgId FROM user WHERE id = ?`;
                db.query(orgIdFinderSql, [res.locals.id], (err, val)=>{
                    const creatorSql = `INSERT INTO project (projectName, createdBy, orgId) VALUES (?,?,?)`;
                    db.query(creatorSql, [projectName, res.locals.id, val[0].orgId]);
                    return res.status(200).json({message:'Project Created'});
                })
            }
        });
    }catch(error){
        return res.status(500).json('Internal Server Error');
    }
}

const getAllProjects = async(req, res) => {
    try{
        const finderSql = `SELECT id, projectName FROM project WHERE createdBy = ?`;
        db.query(finderSql, [res.locals.id], (err, val)=>{
            if(val.length > 0){
                return res.status(200).json(val);
            }else{
                return res.status(404).json('No projects found');
            }
        });
    }catch(error){
        return res.status(500).json('Internal Server Error');
    } 
}

const updateProject = (req, res)=>{
    const projectId = req.params.id;
    const{projectName} = req.body;
    try{
        const finderSql = `SELECT * FROM project WHERE id = ?`;
        db.query(finderSql, [projectId], (err, val)=>{
            if(val.length > 0){
                const updaterSql = `UPDATE project SET projectName = ? WHERE id = ?`;
                db.query(updaterSql, [projectName, projectId]);
                return res.status(301).json('Project Updated');
            }else{
                return res.status(404).json('No Projects Found');
            }
        });
    }catch(error){
        return res.status(500).json('Internal Server Error');
    }
}

const deleteProject = (req, res)=>{
    const projectId = req.params.id;
    try{
        const finderSql = `SELECT * FROM project WHERE id = ?`;
        db.query(finderSql, [projectId], (err, val)=>{
            if(val.length > 0){
                const deleterSql = `DELETE FROM project WHERE id = ?`;
                db.query(deleterSql, [projectId]);
                return res.status(200).json('Project Deleted');
            }else{
                return res.status(404).json('No Project Found');
            }
        });
    }catch(error){
        return res.status(500).json('Internal Server Error');
    }
}

const getProjectById = (req, res)=>{
    const projectId = req.params.id;
    try{
        const projectGetterSql = `SELECT * FROM project WHERE id = ?`;
        db.query(projectGetterSql, [projectId], (err, val)=>{
            if(val.length > 0){
                return res.status(200).json(val);
            }else{
                return res.status(404).json('No Projects Found');
            }
        })
    }catch(error){
        return res.status(500).json('Internal Server Error');
    } 
}



module.exports={
    createProject,getAllProjects,updateProject, deleteProject,getProjectById,
}