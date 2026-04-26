<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

// 🔥 IMPORTANTE (para evitar problemas CORS)
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit(0);
}

$archivo = "datos.json";

// Crear archivo si no existe
if (!file_exists($archivo)) {
    file_put_contents($archivo, json_encode([]));
}

// Leer datos existentes
$datos = json_decode(file_get_contents($archivo), true);

// 🔹 GUARDAR DATOS
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $input = json_decode(file_get_contents("php://input"), true);

    // 🔥 DEBUG
    if (!$input) {
        echo json_encode(["error" => "No llegaron datos"]);
        exit;
    }

    $nuevo = [
        "nombre" => $input["nombre"] ?? "",
        "email" => $input["email"] ?? ""
    ];

    $datos[] = $nuevo;
    file_put_contents($archivo, json_encode($datos));

    echo json_encode(["mensaje" => "Guardado correctamente"]);
}

// 🔹 OBTENER DATOS
if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo json_encode($datos);
}