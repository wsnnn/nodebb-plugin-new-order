"use strict";

/**
 * Topics
 * { getTopicField: [Function],
  getTopicFields: [Function],
  getTopicsFields: [Function],
  getTopicData: [Function],
  getTopicsData: [Function],
  getCategoryData: [Function],
  setTopicField: [Function],
  setTopicFields: [Function],
  deleteTopicField: [Function],
  deleteTopicFields: [Function],
  create: [Function],
  post: [Function],
  reply: [Function],
  delete: [Function],
  restore: [Function],
  purgePostsAndTopic: [Function],
  purge: [Function],
  getTotalUnread: [Function],
  getUnreadTopics: [Function],
  unreadCutoff: [Function],
  getUnreadTids: [Function],
  pushUnreadCount: [Function],
  markAsUnreadForAll: [Function],
  markAsRead: [Function],
  markAllRead: [Function],
  markTopicNotificationsRead: [Function],
  markCategoryUnreadForAll: [Function],
  hasReadTopics: [Function],
  hasReadTopic: [Function],
  markUnread: [Function],
  filterNewTids: [Function],
  filterUnrepliedTids: [Function],
  getRecentTopics: [Function],
  getLatestTopics: [Function],
  getLatestTidsFromSet: [Function],
  updateTimestamp: [Function],
  updateRecent: [Function],
  getPopular: [Function],
  isOwner: [Function],
  getUids: [Function],
  createTopicFromPosts: [Function],
  movePostToTopic: [Function],
  onNewPostMade: [Function],
  getTopicPosts: [Function],
  addPostData: [Function],
  modifyPostsByPrivilege: [Function],
  addParentPosts: [Function],
  calculatePostIndices: [Function],
  getLatestUndeletedPid: [Function],
  getLatestUndeletedReply: [Function],
  addPostToTopic: [Function],
  removePostFromTopic: [Function],
  getPids: [Function],
  increasePostCount: [Function],
  decreasePostCount: [Function],
  increaseViewCount: [Function],
  getTitleByPid: [Function],
  getTopicFieldByPid: [Function],
  getTopicDataByPid: [Function],
  getPostCount: [Function],
  toggleFollow: [Function],
  follow: [Function],
  unfollow: [Function],
  ignore: [Function],
  isFollowing: [Function],
  isIgnoring: [Function],
  getFollowers: [Function],
  getIgnorers: [Function],
  filterIgnoringUids: [Function],
  filterWatchedTids: [Function],
  filterNotIgnoredTids: [Function],
  notifyFollowers: [Function],
  createTags: [Function],
  createEmptyTag: [Function],
  updateTag: [Function],
  getTagTids: [Function],
  getTagTopicCount: [Function],
  deleteTags: [Function],
  deleteTag: [Function],
  getTags: [Function],
  getTagData: [Function],
  getTopicTags: [Function],
  getTopicsTags: [Function],
  getTopicTagsObjects: [Function],
  getTopicsTagsObjects: [Function],
  updateTags: [Function],
  deleteTopicTags: [Function],
  searchTags: [Function],
  autocompleteTags: [Function],
  searchAndLoadTags: [Function],
  getRelatedTopics: [Function],
  getTeasers: [Function],
  getTeasersByTids: [Function],
  getTeaser: [Function],
  updateTeaser: [Function],
  getSuggestedTopics: [Function],
  tools:
   { delete: [Function],
     restore: [Function],
     purge: [Function],
     lock: [Function],
     unlock: [Function],
     pin: [Function],
     unpin: [Function],
     orderPinnedTopics: [Function],
     move: [Function] },
  resizeAndUploadThumb: [Function],
  getUserBookmark: [Function],
  getUserBookmarks: [Function],
  setUserBookmark: [Function],
  getTopicBookmarks: [Function],
  updateTopicBookmarks: [Function],
  merge: [Function],
  exists: [Function],
  getPageCount: [Function],
  getTidPage: [Function],
  getTopicsFromSet: [Function],
  getTopics: [Function],
  getTopicsByTids: [Function],
  getTopicWithPosts: [Function],
  getMainPost: [Function],
  getMainPids: [Function],
  getMainPosts: [Function],
  isLocked: [Function],
  search: [Function] }
 * @param tid
 * @param uid
 */


/**
 * Posts
 * { create: [Function],
  delete: [Function],
  restore: [Function],
  purge: [Function],
  edit: [Function],
  urlRegex: { regex: /href="([^"]+)"/g, length: 6 },
  imgRegex: { regex: /src="([^"]+)"/g, length: 5 },
  parsePost: [Function],
  parseSignature: [Function],
  relativeToAbsolute: [Function],
  getUserInfoForPosts: [Function],
  isOwner: [Function],
  isModerator: [Function],
  getPostsFromSet: [Function],
  isMain: [Function],
  getTopicFields: [Function],
  generatePostPath: [Function],
  generatePostPaths: [Function],
  getCidByPid: [Function],
  getCidsByPids: [Function],
  filterPidsByCid: [Function],
  getPostSummaryByPids: [Function],
  getRecentPosts: [Function],
  getRecentPosterUids: [Function],
  tools: { delete: [Function], restore: [Function], purge: [Function] },
  upvote: [Function],
  downvote: [Function],
  unvote: [Function],
  hasVoted: [Function],
  getVoteStatusByPostIDs: [Function],
  getUpvotedUidsByPids: [Function],
  bookmark: [Function],
  unbookmark: [Function],
  hasBookmarked: [Function],
  shouldQueue: [Function],
  addToQueue: [Function],
  removeFromQueue: [Function],
  submitFromQueue: [Function],
  editQueuedContent: [Function],
  canEditQueue: [Function],
  exists: [Function],
  getPidsFromSet: [Function],
  getPostsByPids: [Function],
  getPostSummariesFromSet: [Function],
  getPostData: [Function],
  getPostField: [Function],
  getPostFields: [Function],
  getPostsFields: [Function],
  setPostField: [Function],
  setPostFields: [Function],
  getPidIndex: [Function],
  getPostIndices: [Function],
  updatePostVoteCount: [Function],
  modifyPostByPrivilege: [Function] }

 */

var async = require('async');
var _ = require('lodash');

var db = module.parent.require('./database');
var topics = module.parent.require('./topics');
var posts = module.parent.require('./posts');




var controllers = require('./lib/controllers'),
    //Таблица соотношения уровня и кода сортировки. Начинается с 0
    levelTable = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'],
	plugin = {};

plugin.init = function(params, callback) {
	var router = params.router,
		hostMiddleware = params.middleware,
		hostControllers = params.controllers;

	// We create two routes for every view. One API call, and the actual route itself.
	// Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.

	router.get('/admin/plugins/quickstart', hostMiddleware.admin.buildHeader, controllers.renderAdminPage);
	router.get('/api/admin/plugins/quickstart', controllers.renderAdminPage);

	callback();
};

plugin.addAdminNavigation = function(header, callback) {
	header.plugins.push({
		route: '/plugins/quickstart',
		icon: 'fa-tint',
		name: 'Quickstart'
	});

	callback(null, header);
};

plugin.topicReply = function(postData, callback){
    console.log("action:topic.reply");
    //console.log(postData);
    //callback(null, postData);
}

plugin.getPost= function(postData, callback){
    console.log("filter:post.get");
    //console.log(postData);
    callback(null, postData);
}

plugin.getSaved = function(postData, callback) {
    console.log("action:post.save");
    console.log(postData);
    //callback(null, postData);
}


/**
 * Вызывается при создании нового поста
 *
 * Генерируется уровень вложенности, затем код сортировки и пост добавляется к индексу сортировки топика
 *
 * @param postData
 * @param callback
 */
plugin.addOrder = function(postData, callback) {
    var isMain = false;

    //если нет parent, то инкрементить orderReplies для main
    postData.post.orderReplies = 0; //для нового ответа всегда 0

	var orderCollection = {};

    async.waterfall([
        function (next) {
            //Проверка на топикстартер
            topics.getTopicField(postData.post.tid, 'mainPid', next);
        },
        function (ismain, next) {
            isMain = (ismain > 0)? false : true ;
            //Уровень вложенности
            generateOrderLevel(isMain, postData.data.toPid, next);
        },
        function (orderLevel, next) {
            orderCollection.level = orderLevel;
            //Код сортировки orderCode
            generateOrderCode(isMain,postData.post.tid, postData.data.toPid, orderLevel, next);
        },
        function (data, next) {
            orderCollection.code = data.code;
            orderCollection.parentCode = data.parentCode? data.parentCode: '';

            //Добавляем пост в индекс, только не главный
            if(!isMain){
                db.sortedSetAdd('tid:' + postData.post.tid + ':posts:order', 0, data.code+':'+postData.post.pid, errCallb);
            }
            next(null, orderCollection);
        },
        function (data, next) {
            postData.post.orderLevel = data.level;
            postData.post.orderCode = data.code;
            postData.post.orderParentCode = data.parentCode;

            console.log("plugin.addOrder is done");
            console.log(data);

            next(null, postData);
        },

    ], callback);


    function errCallb(err, res) {
        if (err) console.log(err);
    }
	//callback(null, postData);
}







/**
 * Генерация уровня вложенности
 * @param bool isA_level Если первый уровень
 * @param int parentId
 * @param int callback номер уровня вложенности
 */
function generateOrderLevel(isMain, parentId, callback) {
    if(!parentId){
    	//Для ответов на главный топик всегда 0
        callback(null, 0);
        return;
	}
	else{
        async.waterfall([
            function (next) {
    			posts.getPostField(parentId, 'orderLevel', next );
            },
            function (parentOrder, next) {
                next(null, parseInt(parentOrder, 10)+1);
            }
        ], callback);
	}
}


/**
 * Генерация кода сортировки a1b2
 * @param isA_level  Первый уровень, кроме главного
 * @param tid id топика
 * @param parentId
 * @param orderLevel уровень вложенности
 * @param object callback {code:'a1b1', parentCode: 'a1'}
 */
function generateOrderCode(isMain, tid, parentId, orderLevel, callback) {
    
    //Триггер для всех комментов первого уровня, кроме главного
    if(!parentId){
        async.waterfall([
            function (next) {
                //Получение pid для главного поста
                incrMainPost(tid,next);
            },
            function (orderReplies, next) {
            var tmpNum = isMain? 0: orderReplies;
                next(null, {code:'a'+tmpNum, parentCode: null});
            }
        ], callback);
        return;
    } else{
        //TODO Генерация для остальных уровней
        async.waterfall([
            function (next) {
                //Инкремент ответов родителю
                db.incrObjectField('post:' + parentId, 'orderReplies',next);
            },
            function (orderReplies, next) {
                async.parallel({
                    //Свой код
                    code: function (next) {
                        next(null, levelTable[parseInt(orderLevel, 10)]+orderReplies);
                    },
                    //Код родителя
                    parentCode: function (next) {
                        posts.getPostField(parentId, 'orderCode', next );

                    }
                }, next);
            },
            function (results, next) {
                console.log("results");
                console.log(results);
                //Склейка родительского и своего кода
                next(null, {code:results.parentCode+results.code, parentCode: results.parentCode});
            }
        ], callback);
	}

}



/**
 * Инкремент кол-ва ответов для главного поста
 * @param tid
 * @param callback Возвращает кол-ва ответов
 */
function incrMainPost(tid, callback) {

    async.waterfall([
        function (next) {
    		//Получение pid для главного поста
            topics.getTopicField(tid, 'mainPid',next);
        },
        function (pid, next) {
    		//Инкремент кол-ва ответов для главного поста
            db.incrObjectField('post:' + pid, 'orderReplies',next);
        }
		/*function (data, next) {
    		//Получение кол-ва ответов orderReplies главного поста
            console.log(data);
            posts.getTopicField(tid,orderReplies,next);
            //topics.getMainPost(tid, 1,next);
		}*/

    ], callback);
}

module.exports = plugin;