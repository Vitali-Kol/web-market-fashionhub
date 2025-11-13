<?php
require __DIR__.'/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['status'=>'error','message'=>'Only POST allowed'], 405);
}

// Destroy session
$_SESSION = [];

if (ini_get("session.use_cookies")) {
  $params = session_get_cookie_params();
  setcookie(
    session_name(),
    '',
    time() - 42000,
    $params["path"],
    $params["domain"],
    $params["secure"],
    $params["httponly"]
  );
}

session_destroy();

json_response(['status'=>'success','message'=>'Logged out']);
