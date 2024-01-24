<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . '/../Classes/GetAllSubsNames.php';

function get_all_subs_names()
{

    $getAllSubsNames = new GetAllSubsNames();
    $getAllSubsNames->getAllSubsNames();
}