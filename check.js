const fs=require("fs")
let extentionMapping=require("./util.js")


path="./Downloads"
allfiles=fs.readdirSync(path)

for(i in allfiles){                                  //getting all the files from the path
    sort(allfiles[i])
}

function sort(file){                                //function to arrange all the files
    extension=getextension(file)
    adToFolder(file,extension)
}

function getextension(file){                        //getting the extensions from the files
    temp=file.split(".")
    return temp[1]
}

function adToFolder(file,extension){               //function to add the files to the respective folder
    foldername=checkfoldername(extension)
    isfolder=isfoldername(foldername)
    if(isfolder){
        movefile(file,foldername)
    }
    else{
        createfolder(foldername)
        movefile(file,foldername)
    }
}

function checkfoldername(extension){              //find the folder from the extensionMapping object for the respective extension
    for (folder in extentionMapping){
        if(extentionMapping[folder].includes(extension)){
            return folder
        }
    }
}

function isfoldername(foldername){              //function to check the folder is available or not
    temppath=path+"/"+foldername
    if(fs.existsSync(temppath)){
        return true
    }
    else{
        return false
    }
}

function createfolder(foldername){             //function to create the folder if the folder is not available 
    temppath=path+"/"+foldername
    fs.mkdirSync(temppath)
}

function movefile(file,foldername){           //function to move the file from their respective folder
    oldpath=path+"/"+file
    newpath=path+"/"+foldername+"/"+file
    fs.renameSync(oldpath,newpath)
}