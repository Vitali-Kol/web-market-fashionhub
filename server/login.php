<?php
require __DIR__.'/database-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_response(['status'=>'error','message'=>'Only POST allowed'], 405);
}

$data = json_decode(file_get_contents('php://input'), true) ?: [];
$email = trim($data['email'] ?? '');
$pass  = $data['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_response(['status'=>'error','message'=>'Invalid email'], 422);
}
if (strlen($pass) < 5) {
  json_response(['status'=>'error','message'=>'Password too short'], 422);
}

$pdo = pdo();
$stmt = $pdo->prepare("SELECT id, email, password_hash, name, role FROM users WHERE email=?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($pass, $user['password_hash'])) {
  json_response(['status'=>'error','message'=>'Invalid email or password'], 401);
}

$_SESSION['user'] = [
  'id' => $user['id'],
  'email' => $user['email'],
  'name' => $user['name'],
  'role' => $user['role']
];

json_response(['status'=>'success','message'=>'Login successful','user'=>$_SESSION['user']]);
