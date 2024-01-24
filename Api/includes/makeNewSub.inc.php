<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/MakeNewSub.php";

function make_new_sub($title, $creator)
{
    $makeNewSub = new MakeNewSub($title, $creator);
    $makeNewSub->createSub();
}