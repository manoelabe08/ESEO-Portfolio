<?php
require 'connexion.php';

if (!isset($_GET['id'])) {
    header('Location: liste.php');
    exit;
}

$id = (int) $_GET['id'];

$sql = "DELETE FROM produits WHERE id = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([':id' => $id]);

header('Location: liste.php');
exit;
