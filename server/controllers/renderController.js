const { Collection, Bookmark, Tag, Workspace, User } = require('../models');

exports.renderMainPage = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            include: {
                model: Workspace,
                as: 'workspaces',
                include: {
                    model: Collection,
                    as: 'collections',
                    include: [
                        {
                            model: Bookmark,
                            as: 'bookmarks'
                        },
                        {
                            model: Tag,
                            as: 'tags'
                        }
                    ]
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const workspaces = user.workspaces;

        const tags = await Tag.findAll({
            where: { userId }
        });

        const users = await User.findAll();

        const collections = await Collection.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: Bookmark,
                    as: 'bookmarks'
                },
                {
                    model: Tag,
                    as: 'tags'
                }
            ]
        });

        const collectionCount = await Collection.count({
            where: { userId }
        });

        res.render('toby', { user: req.user, users, workspaces, tags, collectionCount, collections });
    } catch (error) {
        console.error('Error fetching data: ', error);
        res.status(500).send('Internal Server Error');
    }
};



// const { Collection, Bookmark, Tag, Workspace, User, WorkspaceUser } = require('../models');

// exports.renderMainPage = async (req, res) => {
//     try {
//         const userId = req.user.id;

//         const user = await User.findByPk(userId, {
//             include: {
//                 model: Workspace,
//                 as: 'workspaces',
//                 include: {
//                     model: Collection,
//                     as: 'collections',
//                     include: [
//                         {
//                             model: Bookmark,
//                             as: 'bookmarks'
//                         },
//                         {
//                             model: Tag,
//                             as: 'tags'
//                         }
//                     ]
//                 }
//             }
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const workspaces = await Promise.all(user.workspaces.map(async workspace => {
//             const workspaceUser = await WorkspaceUser.findOne({
//                 where: { userId, workspaceId: workspace.id }
//             });
//             return {
//                 ...workspace.toJSON(),
//                 userRole: workspaceUser ? workspaceUser.role : null
//             };
//         }));

//         const tags = await Tag.findAll({
//             where: { userId }
//         });

//         const users = await User.findAll();

//         const collections = await Collection.findAll({
//             where: { userId: req.user.id },
//             include: [
//                 {
//                     model: Bookmark,
//                     as: 'bookmarks'
//                 },
//                 {
//                     model: Tag,
//                     as: 'tags'
//                 }
//             ]
//         });

//         const collectionCount = await Collection.count({
//             where: { userId }
//         });

//         res.render('toby', { user: req.user, users, workspaces, tags, collectionCount, collections });
//     } catch (error) {
//         console.error('Error fetching data: ', error);
//         res.status(500).send('Internal Server Error');
//     }
// };
