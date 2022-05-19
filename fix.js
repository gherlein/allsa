#!/usr/bin/env node
'use strict';
const fs = require('fs')

if (process.argv.length < 3) {
    console.log("usage: %s <folder>\n", process.argv[1]);
    process.exit(1);
}
const dir = process.argv[2];

let header = "id,login,name,first_name,last_name,department_number,department_name,job_title,is_manager,bar_raiser,building,building_room,city,country,";
header += "phone_number,mobile_number,pager_number,office_number,email,pager_email,blog_url,team_site_name,team_site_url,steam,business_unit,custom_photo_id,job_level,";
header += "hire_date,days_before_last_hire,nick_name,pronouns,person_id,manager_person_id,badge_type,hire_date_iso,tenure_days,manager"
console.log(header);

const files = fs.readdirSync(dir)
for (const file of files) {
    let jsonData = require("./" + dir + "/" + file);
    let outData = jsonData;
    delete outData.about;

    let manager = "<undefined>";
    try {
        if (jsonData && jsonData.manager && jsonData.manager.login) {
            const manager = jsonData.manager.login;
        }
    } catch {
        console.log("error in record: ", jsonData.login);

    }
    delete outData.manager;
    outData.manager = manager;
    delete outData.direct_reports;

    var outString = "";
    Object.keys(outData).forEach(key => {
        if (outData[key]) {
            let temp = String(outData[key]);
            outString += '"' + temp.replaceAll(',', ' ') + '"' + ',';
        } else {
            if (outData[key] == true) {
                outString += "TRUE,";
            } else if (outData[key] == null) {
                outString += '" ",';
            } else {
                outString += "FALSE,";
            }
        }
    })
    if (outString.charAt(outString.length - 1) == ",") {
        outString = outString.slice(0, -1);
    }
    console.log(outString);
}

