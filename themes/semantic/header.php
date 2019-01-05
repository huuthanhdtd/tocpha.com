<!doctype html>
<html ng-app="app">
	<head>
		<meta charset="utf-8">
		<title><?php echo page_title('Page can\'t be found'); ?> - <?php echo site_name(); ?></title>

		<meta name="description" content="<?php echo site_description(); ?>">

		<link rel="stylesheet" href="<?php echo theme_url('/css/reset.css'); ?>">
		<link rel="stylesheet" href="<?php echo theme_url('/css/style.css'); ?>">
		<link rel="stylesheet" href="<?php echo theme_url('/css/small.css'); ?>" media="(max-width: 400px)">

		<link rel="alternate" type="application/rss+xml" title="RSS" href="<?php echo rss_url(); ?>">
		<link rel="shortcut icon" href="<?php echo theme_url('img/favicon.png'); ?>">

		<!--[if lt IE 9]>
			<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->

		<script>var base = '<?php echo theme_url(); ?>';</script>

	  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	  <meta name="generator" content="Tocpha.com">
		<meta name="author" content="http://huuthanhdtd.com/" />
		<meta http-equiv="Cache-Control" content="no-siteapp"/>
		<link rel="icon" type="image/png" href="assets/common/favicon.png">
		<meta name="mobile-web-app-capable" content="yes">
		<link rel="icon" sizes="192x192" href="assets/common/favicon.png">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<meta name="apple-mobile-web-app-title" content="HuuThanhDTD"/>
		<meta name="theme-color" content="#2C4762">
		<link rel="apple-touch-icon-precomposed" href="assets/common/app-icon72x72@2x.png">
		<meta name="msapplication-TileImage" content="assets/common/app-icon72x72@2x.png">
		<meta name="msapplication-TileColor" content="#2C4762">
    <link rel="stylesheet" href="assets/application.min.css" media="all" rel="stylesheet">
		<script src="assets/application.full.js"></script>

    <meta property="og:title" content="<?php echo page_title(); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo e(current_url()); ?>">
    <meta property="og:image" content="<?php echo theme_url('img/og_image.gif'); ?>">
    <meta property="og:site_name" content="<?php echo site_name(); ?>">
    <meta property="og:description" content="<?php echo page_description(); ?>">

  </head>
  
<body>
	<header class="master-header">
  <div class="ui transparent inverted main menu page grid">
    <div class="middle aligned column header-container">
      <!-- Left -->
      <!-- Logo -->
      <p class="logo item">
        <a href="/">
          <svg height="21.6" class="ui image" viewBox="0 10.5 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M14.026 23.572Q14.490 23.572 15.076 23.352L15.076 24.951Q14.551 25.244 13.525 25.244Q10.852 25.244 10.852 22.156L10.852 13.354L5.029 13.354L5.029 25L3.003 25L3.003 13.354L0.305 13.354L0.305 12.451L2.051 11.621L15.479 11.621L15.479 13.354L12.878 13.354L12.878 21.997Q12.878 22.900 13.190 23.236Q13.501 23.572 14.026 23.572Z" fill="rgba(255,255,255,1)"></path></svg>
</a>      </p>
      <!-- Search field -->
      <form id="search-form" class="ui search item ng-pristine ng-valid" method="POST" action="<?php echo search_url(); ?>">
        <div class="ui icon input">
          <input id="search-field" name="term" class="focus-popup" type="text" placeholder="Tìm kiếm" autocomplete="off" data-content="<span>Nhập từ và </span><div class='enter-button'><span>enter </span><i class='clockwise rotated level down icon'></i></div><span> để bắt đầu tìm kiếm</span>" data-position="bottom center" data-offset="7">
        </div>
      </form>

      <!-- JS variable of logged-in or guest -->
      <input type="hidden" ng-init="userLoggedIn=true<?php //echo $this->user->hasLogin()?'true':'false' ?>">

      <!-- Logged in header -->
        <div class="right menu">
          <!-- New post -->
          <a class="item store scale-item" href="/new.html">
            <i class="small edit icon"></i>
            <strong>Viết bài</strong>
        </a>
          <!-- Home -->
          <a class="item home scale-item" href="/">
            <i class="small home icon"></i>
            <strong>Trang chủ</strong>
          </a>
          <!-- Search -->
          <a class="item scale-item search" href="/search/keywords">
            <i class="small search icon"></i>
          </a>
          <!-- JLPT -->
          <a class="item scale-item" href="/jlpt.html">
            <i class="small smile icon"></i>
            <strong>JLPT</strong>
          </a>

          <!-- Contact -->
          <a class="item store scale-item" href="/quiz.html" title="Quiz"><i class="small help icon"></i><strong>Quiz</strong></a>
            <?php if (false): while($pages->next()): ?>
            <a class="item store scale-item" href="<?php $pages->permalink(); ?>" title="<?php $pages->title(); ?>"><i class="small <?php echo ($pages->title=='Quiz')?'help':'book'; ?> icon"></i><strong><?php $pages->title(); ?></strong></a>
            <?php endwhile; endif; ?>

          <!-- Profile -->
          <?php if(false && $this->user->hasLogin()): ?>
            <input type="hidden" name="screenName" id="screenName" value="<?php $this->author->screenName(); ?>">
          <div class="ui profile right top pointing dropdown item">
            <div class="ui avatar image">
              <img class="lazy" src="assets/common/female.png">
            </div>
            <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item" href="/author/<?php //echo $this->user->uid; ?>">
                <i class="user icon"></i>
                Trang cá nhân
              </a>
              <a class="item" href="/setting.html">
                <i class="setting icon"></i>
                Cài đặt
              </a>
                
              <a class="item" href="<?php //$this->options->logoutUrl(); ?>">
                <i class="sign out icon"></i>
                Đăng xuất
              </a>
              
            </div>
          </div>
          <?php else: ?>
            <a class="item store scale-item" href="<?php //$this->options->adminUrl('login.php'); ?>">
            <i class="small sign in icon"></i>
            <strong>Đăng nhập</strong>
          </a>
          <?php endif; ?>
          
        </div>
    </div>
  </div>
</header>

<main class="master-body" scrollable-to-top data-target=".scroll-top">
