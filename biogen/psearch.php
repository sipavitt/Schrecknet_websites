<?php

// Normalise input
$pid = isset($_GET['pid']) ? strtoupper(trim($_GET['pid'])) : "";

switch ($pid) {

    // SECRET PROJECT
    case "RVK-17":
        header("Location: rvk.html");
        exit;

    // DUMMY PUBLIC-FACING PROJECTS
    case "HMT-04":
        header("Location: hmt04.html");
        exit;

    case "PLS-92":
        header("Location: pls92.html");
        exit;

    case "CLN-31":
        header("Location: cln31.html");
        exit;

    case "DRG-07":
        header("Location: drg07.html");
        exit;

    case "NRV-22":
        header("Location: nrv22.html");
        exit;

    // DEFAULT: 404 PAGE
    default:
        header("Location: error2.html");
        exit;
}
?>
