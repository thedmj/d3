<template>
    <div class="bootstrap">
        <nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Brand</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search">
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Link</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a href="#">Separated link</a></li>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
        <div class="container-fluid">
            <div class=" row">
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                    <div class="well sidebar-nav">
                        <ul class="nav nav-list">
                            <li class="nav-header">Frontend</li>
                            <li class="active">
                                <a href="#">HTML 4.01</a></li>
                            <li>
                                <a href="#">HTML5</a></li>
                            <li>
                                <a href="#">CSS</a></li>
                            <li>
                                <a href="#">JavaScript</a></li>
                            <li>
                                <a href="#">Twitter Bootstrap</a></li>
                            <li>
                                <a href="#">Firebug</a></li>
                            <li class="nav-header">Backend</li>
                            <li>
                                <a href="#">PHP</a></li>
                            <li>
                                <a href="#">SQL</a></li>
                            <li>
                                <a href="#">MySQL</a></li>
                            <li>
                                <a href="#">PostgreSQL</a></li>
                            <li>
                                <a href="#">MongoDB</a></li>
                        </ul>
                    </div>
                    <!--/.well -->
                </div>
                <!--/span-->
                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                    <div class="leaderboard">
                        <h1>Learn. Practice. Develop.</h1>
                        <p>w3cschool offers web development tutorials. We believe in Open Source. Love standards. And prioritize simplicity and readability while serving content.</p>
                        <p>
                            <a class="btn btn-success btn-large">Join w3cschool now</a></p>
                    </div>
                    <div class="row-fluid">
                        <div class="span4">
                            <h2>Learn</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio
                                dui.
                            </p>
                            <p>
                                <a class="btn btn-success btn-large" href="#">Start Learning now</a></p>
                        </div>
                        <!--/span-->
                        <div class="span4">
                            <h2>Practice</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio
                                dui.
                            </p>
                            <p>
                                <a class="btn btn-success btn-large" href="#">Start percticing now</a></p>
                        </div>
                        <!--/span-->
                        <div class="span4">
                            <h2>Develop</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio
                                dui.
                            </p>
                            <p>
                                <a class="btn btn-success btn-large" href="#">Start developing now</a></p>
                        </div>
                        <!--/span-->
                    </div>
                    <!--/row-->
                    <hr>
                    <footer>
                        <p>&copy; Company 2012</p>
                    </footer>
                </div>
            </div>
        </div>
        <!--/.fluid-container-->
    </div>
</template>

<script>
    import "../assets/bootstrap";
    export default {
        name: 'name',
        data: function() {
            return {}
        },
        methods: {}
    }
</script>


<style lang="less">
    @import url("../assets/bootstrap/dist/css/bootstrap.min.css");
    body {
    
    }
    
    .sidebar-nav {
        padding: 9px 0;
    }
    .leaderboard {
        padding: 60px;
        margin-bottom: 30px;
        background-repeat: repeat;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
    }
    .leaderboard h1 {
        font-size: 40px;
        margin-bottom: 5px;
        line-height: 1;
        letter-spacing: -1px;
        color: #92B901;
    }
    .leaderboard p {
        font-size: 18px;
        font-weight: 200;
        line-height: 27px;
    }
    .well {
        background-repeat: repeat;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        padding:0 6px 0 6px;
    }
    
    .nav .nav-header {
        font-size: 18px;
        color: #92B901;
    }
</style>