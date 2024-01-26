<?php

require_once __DIR__ . "/../Classes/DbConnect.php";
require_once __DIR__ . "/../Classes/MakeNewSub.php";
require_once __DIR__ . "/../Classes/SetSubMod.php";
require_once __DIR__ . "/../Classes/FollowSub.php";

function make_new_sub($title, $creator)
{
    $makeNewSub = new MakeNewSub($title, $creator);
    $makeNewSub->createSub();
}