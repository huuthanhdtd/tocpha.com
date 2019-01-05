<?php theme_include('header'); ?>
<?php
$data = array();
while (posts()) {
    // $tags = array();
    // foreach ($this->tags as $tag) {
    //     $tags[] = array('path' => $tag['permalink'], 'name' => $tag['name']);
    // }

    $data[] = array('cmts_cnt' => 7,
                    'created_at' => date(DATE_W3C, article_time()),
                    'like_cnt' => 0,
                    'path' => article_url(),
                    'preview' => article_title(),
                    'til' => false,
                    'title' => article_title(),
                    'tags' => '$tags',
                    'user' => array('name' => article_author('real_name'), 'avatar_url_path' => 'assets/common/female.png', 'mypage_user_path'=> '/author/1')
                    );
}
?>
<link rel="stylesheet" href="assets/board.css" media="all" rel="stylesheet">
<div class="ui page grid">
  <div class="eleven wide column feed-col" ng-controller="FeedController" ng-init="focusTab('top', true)">
    <input type="hidden" ng-init="new_notif_number=1">
    <input type="hidden" ng-init="til_notif_number=1">
    <input type="hidden" ng-init="data_retrieving=false">
    <input type="hidden" ng-init="reachFull=false">
    <input type="hidden" ng-init='posts=<?php echo json_encode($data); ?>'>

    <!-- New post -->
    <div class="new-post">
      <h4 class="caption">
        <i class="small quote left icon"></i>
        <span class="content">
          I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.
        </span>
        <i class="small quote right icon"></i>
        <span class="author">
          —
          Oktal
        </span>
      </h4>
    </div>

    <!-- Tabular menu -->
    <div ng-cloak class="ui top attached fluid tabular menu">
      <a class="item" ng-class="{'active':focus=='top'}" ng-click="focusTab('top')" id="top-tab">
        <span>
          Bài viết
        </span>
      </a>
    </div>

    <div class="feed">

      <!-- Retrieving data -->
      <div class="ui basic data retrieve segment" ng-show="data_retrieving">
        <div class="ui inverted dimmer active">
          <div class="ui text loader" style="background: url(assets/common/ring.gif) no-repeat 45% 0!important; background-size: 32px 32px!important;">
            Đang tải dữ liệu ...
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div ng-cloak class="ui bottom attached tab massive selection divided list feed-list" ng-class="{'active':focus=='top'}" ng-hide="data_retrieving" id="top-panel">

        <div class="item" ng-repeat="post in posts">

          <!-- Item -->
          <a href="{{ post.user.mypage_user_path }}" class="ui avatar image">
            <img alt="White" class="lazy" original="{{ post.user.avatar_url_path }}" src="assets/common/white.png" />
          </a>
          <a href="{{ post.path }}" class="right floated feed-date">
            {{ post.like_cnt }}
            <i class="bookmark icon"></i>
            {{ post.cmts_cnt }}
            <i class="comment icon"></i>
          </a>
          <div class="content">
            <div class="header">
              <a href="{{ post.path }}">
                {{ post.title }}
              </a>
              <div class="tag">
                <a href="{{ tag.path }}" class="ui label" ng-repeat="tag in post.tags">
                  {{ tag.name }}
                </a>
              </div>
            </div>
            <div class="detail"> {{post.preview}} </div>
            <div class="meta">
              <a href="{{ post.user.mypage_user_path }}">
                {{ post.user.name}}
              </a>
              viết
              {{ post.created_at }}
              trước
            </div>
            <div class="smart-meta">
              {{ post.like_cnt }}
              <i class="bookmark icon"></i>
              {{ post.cmts_cnt }}
              <i class="comment icon"></i>
            </div>
          </div>
        </div>

        <!-- Load more button -->
        <div class="ui fluid basic button load-more segment touchend-replace" ng-hide="reachFull" ng-click="loadmore('top')">
          <div class="ui inverted dimmer" ng-class="{'active':loading_more}">
            <div class="ui text loader" style="background: url(assets/common/ring.gif) no-repeat 45% 0!important; background-size: 32px 32px!important;">
              Đang tải dữ liệu ...
            </div>
          </div>
          <span ng-hide="loading">
            Xem tiếp...
          </span>
        </div>

      </div>

    </div>

  </div>

  <!-- Blank column -->
  <div class="one wide column blank-col"></div>

  <!-- Meta -->
  <div class="four wide column meta-col">

    <!-- Profile -->
        <div class="meta-profile item">
      <div class="left floated ui bigger avatar image">
        <a href="/author/1">
                    <img class="lazy" src="https://huuthanhdtd.com/assets/common/female.png">
        </a>
      </div>
      <div class="right floated">
        <a class="name" href="/author/1">
          <h2 class="caption">
          HuuThanhDTD          </h2>
</a>        <div class="extra">
          <a href="#">18</a>
          bài viết.
          <br>
          <a href="#">18</a>
          bình luận.
        </div>
      </div>
    </div>
  
  
    <div class="sticky" ng-class="{stick:pinStick}">

      <!-- User ranking -->
      <div class="row meta-ranking-author">
        <p class="ranking-users-title">
          <i class="gold trophy right icon"></i>
          &nbsp; Daily Kanji
        </p>
        <div class="ui selection list ranking-users">
          <div id="kanjiViewer"></div>
            
          
        </div>
      </div>
      <!-- Hot tags -->
            <div class="row meta-hot-tags">
        <p class="suggest-title">
          <i class="tags icon"></i>
          &nbsp; Chủ đề nổi bật
        </p>
        <div class="meta-tags">
                                    <a class="ui label" href="https://huuthanhdtd.com/tag/Tieng-Nhat/">Tiếng Nhật<strong>9</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/h%E1%BB%99i-tho%E1%BA%A1i/">hội thoại<strong>4</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/markdown/">markdown<strong>2</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Thuat-toan/">Thuật toán<strong>2</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Ng%E1%BB%AF-ph%C3%A1p/">Ngữ pháp<strong>2</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/blog/">blog<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Donald-Knuth/">Donald Knuth<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Android/">Android<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Am-lich/">Âm lịch<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Material-Design/">Material Design<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Wordpress/">Wordpress<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Javascript/">Javascript<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Vb-net/">Vb.net<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Bit/">Bit<strong>1</strong></a>
                          <a class="ui label" href="https://huuthanhdtd.com/tag/Ph%C3%A1t-%C3%A2m/">Phát âm<strong>1</strong></a>
                                  </div>
      </div>
      
    </div>
    

    <!-- Scroll to top -->
    <div class="scroll-top">
      <i class="large level up icon"></i>
    </div>

  </div>

</div> <!-- Page grid -->

<?php theme_include('footer'); ?>
