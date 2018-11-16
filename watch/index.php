<?php
$host = $_SERVER['HTTP_HOST']; 
//echo $host;
if($host == 'mobile.mp4-youtube.com' || $host == 'https://mobile.mp4-youtube.com' || $host == 'http://mobile.mp4-youtube.com') {

if (isset($_GET["v"]))
        $v = $_GET["v"];

if($v)
header("Location: https://mobile.mp4-youtube.com/mobile/?v=$v");
else
header('Location: https://mobile.mp4-youtube.com/mobile/');  
}

$itag_info = array(
		18 => "MP4 360p",
		22 => "MP4 720p",
		37 => "MP4 1080p",
		38 => "MP4 3072p",
		59 => "MP4 480p",
		78 => "MP4 480p",
		43 => "WEBM 360p",
		36 => "3GP 240p",
		17 => "3GP 144p"
	);

if (isset($_GET["v"]))
	$v = $_GET["v"];
parse_str(file_get_contents('http://www.youtube.com/get_video_info?video_id='.$v), $video_data);
$streams = $video_data['url_encoded_fmt_stream_map'];
$streams = explode(',',$streams);
$counter = 1;

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="../assets/img/favicon.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>MP4-Youtube : Free Online YouTube Downloader</title>
  <meta name="description" content="Free Online service to Download YouTube videos at one click! The best YouTube Downloader supporting fast and easy vimeo, Facebook and Dailymotion video Download and much more!">
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
  <link href="../assets/css/material-dashboard.css?v=2.1.0" rel="stylesheet" />
</head>

<body class="dark-edition" style="text-align: center;">
  <div class="wrapper ">
    <div class="main-panel">
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-6 col-lg-12" style="margin: 0 auto;">

		<nav class="card footer">
			<div class="container-fluid">
			  <nav class="float-center">
			    <ul>
			      <li>
				<a href="https://mp4-youtube.com">
				  MP4-YouTube
				</a>
			      </li>
			      <li>
				<a href="https://mp4-youtube.com/about">
				  About Us
				</a>
			      </li>
			      <li>
				<a href="https://mp4-youtube.com/tos">
				  tos
				</a>
			      </li>
			    </ul>
			  </nav>
			</div>
		</nav>
		<div class="card">
		 <form class="container-fluid" method="get" action="">
			      <div class="input-group no-border">
				<input type="text" name="v" value="" id="yt" class="form-control" placeholder="Just Insert Youtube Link or Video ID">
				<button type="submit" id="oki" class="btn btn-info btn-round btn-just-icon" onclick="rotate();">
				  <i id="dli" class="material-icons">autorenew</i>
				  <div class="ripple-container"></div>
				</button>
			      </div>
		 </form>
		</div>
<?php if($video_data['title']){?>
              <div class="card card-chart">
                <div class="card-body">
			<div class="row">
         		   <div class="col-xl-6 col-lg-12" style="margin: 0 auto;">
              		    <img src="https://i.ytimg.com/vi/<?php echo $v;?>/hqdefault.jpg" class="card-img-top" alt="<?php echo $video_data['title'];?>">
                	   </div>
			<div class="col-xl-6 col-lg-12" style="margin: 0 auto;">
				<h4 class="card-title titl"><?php echo $video_data['title'];?></h4>
                		  <p class="card-category">
                 		   <span class="text-warning"><?php echo gmdate("H:i:s",$video_data['length_seconds']);?></span></p>
				   <h5>Downloads Links :</h5>
				<?php
if(!$streams[0]){
printf('<span class="btn btn-info">No Downloads Available</span>');}
else{
					foreach ($streams as $streamdata) {
					parse_str($streamdata,$streamdata);
					$link = '';
					$quality = '';
						foreach ($streamdata as $key => $value) {
					if ($key == "url") {
								$link = urldecode($value);

							}
							      elseif($key == "itag"){
								$quality = $itag_info[$value];
							}
							/*else {
								printf('<h5 class="mb-0">%s</h5> - %s <br><br>', $key, $value);
							}*/

						}

					printf('<a href="%s" target="_blank" class="btn btn-info" download="%s-%s">%s  <i class="material-icons">cloud_download</i></a>',$link,str_replace('"','',$video_data['title']),$quality,$quality);
						$counter = $counter+1;
					}
}?>
              		</div></div></div>
              </div>
<?php
}
elseif($v){
?>
                <div class="card card-chart">
                <div class="card-body">
                  <h4 class="card-title"><b> Wrong Link ! Try Again</b></h4>
                  </div>
              </div>
<?php } ?>

		<div class="card card-chart">
                <div class="card-body">
                  <h4 class="card-title"><b>How To Use ?</b></h4>
			<h5>Copy the necessary URL or ID to the input field on the top of the page and press <strong>Enter</strong> or click the "Download" button next to the input field .</h5>
			<h4><b>OR</b></h4>
			<h5>Add '<strong>mp4-</strong>' before the URL and press Enter </br>Example: <strong>mp4-</strong>youtube.com/watch?v=u7deClndzQw</h5>
                </div>
              </div>
		<footer class="card footer">
			<div class="container-fluid">
			  <nav class="float-center">
			    <ul>
			      <li>
				<a href="https://mp4-youtube.com">
				  MP4-YouTube
				</a>
			      </li>
			      <li>
				<a href="https://mp4-youtube.com/about">
				  About Us
				</a>
			      </li>
			      <li>
				<a href="https://mp4-youtube.com/tos">
				  tos
				</a>
			      </li>
			    </ul>
			  </nav>
			</div>
	      </footer>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
<style>.dark-edition .form-control, .is-focused .dark-edition .form-control {background-image: linear-gradient(to top, #429eb2 2px, rgba(156, 39, 176, 0) 2px), linear-gradient(to top, rgba(180, 180, 180, 0.1) 1px, rgba(180, 180, 180, 0) 1px);}.card .card-body {padding: 1rem;}.btn {width: 32%;margin: 0.125rem;padding: 0.5rem;font-size: small;font-weight: 600;}button#oki,input#yt {margin: 15px;}input#yt {text-align: center;}.card-img-top{border-radius: 6px;}.card-header {padding: 0;}.main-panel {width: calc(100%);}.main-panel>.content {margin-top: 0;padding: 0;}nav.card.footer {margin-top: 10px;}footer.card.footer {margin-bottom: 10px;}h4.titl {padding-top: 1.5rem;}.dark-edition .btn.btn-info {color: black;}
#dli{color: #fff;}
.spinr{
    -webkit-animation-name: spin;
    -webkit-animation-duration: 4000ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spin;
    -moz-animation-duration: 4000ms;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spin;
    -ms-animation-duration: 4000ms;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear; 
    animation-name: spin;
    animation-duration: 4000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;}
@-moz-keyframes spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
span.btn.btn-info {
    width: 100%;
}
</style>
<script>
function rotate(){
	var element=document.getElementById('dli');
	element.classList.add("spinr");;
}
document.getElementById("oki").addEventListener("click", function() {ytb();}, true);
function ytb() {var x = document.getElementById("yt").value;document.getElementById("yt").value = x.split('?v=')[1].split('&')[0] === undefined ? x : x.split('?v=')[1].split('&')[0] ;}
</script>
  <script src="../assets/js/core/jquery.min.js"></script>
  <script src="../assets/js/core/popper.min.js"></script>
  <script src="../assets/js/core/bootstrap-material-design.min.js"></script>
  <script src="../assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>

<?php include_once("analyticstracking.php") ?>


</body>

</html>
