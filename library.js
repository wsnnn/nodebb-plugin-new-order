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
    //������� ����������� ������ � ���� ����������. ���������� � 0
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

plugin.addOrder = function(postData, callback) {
	console.log("plugin.addOrder");

	//var isA_level = (!postData.post.isMain && !postData.data.toPid) ? true : false;
    var isMain = false;


    //postData.data.toPid
    postData.post.orderParentCode = '';//���� null, �� ��� � � ������� 0


    //���� ��� parent, �� ������������ orderReplies ��� main
    postData.post.orderReplies = 0; //��� ������ ������ ������ 0

	var orderCollection = {};

    async.waterfall([
        function (next) {
            //�������� �� ������������
            topics.getTopicField(postData.post.tid, 'mainPid', next);
        },
        function (ismain, next) {
            isMain = (ismain > 0)? false : true ;
            //������� �����������
            generateOrderLevel(isMain, postData.data.toPid, next);
        },
        function (orderLevel, next) {
            orderCollection.level = orderLevel;
            //��� ���������� orderCode
            generateOrderCode(isMain,postData.post.tid, postData.data.toPid, orderLevel, next);
        },
        function (orderCode, next) {
            orderCollection.code = orderCode;
            //db.sortedSetAdd('tid:' + postData.post.tid + ':posts:order', orderCode, postData.post.pid, errCallb);
            db.sortedSetAdd('tid:' + postData.post.tid + ':posts:order', 0, orderCode+':'+postData.post.pid, errCallb);
            //db.sortedSetAdd('tid:' + postData.post.tid + ':posts:order', 0, orderCode+':pid:'+postData.post.pid, errCallb);
            //db.sortedSetAdd('pid:'+postData.post.pid+ ':posts:order', 0, orderCode, errCallb);
            //db.sortedSetAdd('uid:' + postData.uid + ':posts:order', postData.orderCode, postData.pid, next);
            next(null, orderCollection);
        },
        function (data, next) {
            console.log("colletIsDone");
            console.log(data);
            postData.post.orderLevel = data.level;
            postData.post.orderCode = data.code;
            next(null, postData);
        },

    ], callback);


    function errCallb(err, res) {
        console.log(err);
    }
	//callback(null, postData);
}







/**
 * ��������� ������ �����������
 * @param bool isA_level ���� ������ �������
 * @param int parentId
 * @param int callback ����� ������ �����������
 */
function generateOrderLevel(isMain, parentId, callback) {
    if(!parentId){
    	//��� ������� �� ������� ����� ������ 0
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
 * ��������� ���� ���������� a1b2
 * @param isA_level  ������ �������, ����� ��������
 * @param tid id ������
 * @param parentId
 * @param orderLevel ������� �����������
 * @param callback ��� a1
 */
function generateOrderCode(isMain, tid, parentId, orderLevel, callback) {
    
    //������� ��� ���� ��������� ������� ������, ����� ��������
    if(!parentId){
        async.waterfall([
            function (next) {
                //��������� pid ��� �������� �����
                incrMainPost(tid,next);
            },
            function (orderReplies, next) {
            var tmpNum = isMain? 0: orderReplies;
                next(null, 'a'+tmpNum);
            }
        ], callback);
        return;
    } else{
        //TODO ��������� ��� ��������� �������
        async.waterfall([
            function (next) {
                //��������� ������� ��������
                db.incrObjectField('post:' + parentId, 'orderReplies',next);
            },
            function (orderReplies, next) {
                async.parallel({
                    //���� ���
                    code: function (next) {
                        next(null, levelTable[parseInt(orderLevel, 10)]+orderReplies);
                    },
                    //��� ��������
                    parentCode: function (next) {
                        posts.getPostField(parentId, 'orderCode', next );

                    }
                }, next);
            },
            function (results, next) {
                console.log("results");
                console.log(results);
                //������� ������������� � ������ ����
                next(null, results.parentCode+results.code);
            }
        ], callback);
	}

}



/**
 * ��������� ���-�� ������� ��� �������� �����
 * @param tid
 * @param callback ���������� ���-�� �������
 */
function incrMainPost(tid, callback) {

    async.waterfall([
        function (next) {
    		//��������� pid ��� �������� �����
            topics.getTopicField(tid, 'mainPid',next);
        },
        function (pid, next) {
    		//��������� ���-�� ������� ��� �������� �����
            db.incrObjectField('post:' + pid, 'orderReplies',next);
        }
		/*function (data, next) {
    		//��������� ���-�� ������� orderReplies �������� �����
            console.log(data);
            posts.getTopicField(tid,orderReplies,next);
            //topics.getMainPost(tid, 1,next);
		}*/

    ], callback);
}

module.exports = plugin;