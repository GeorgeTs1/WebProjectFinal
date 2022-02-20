import { AddPoiService } from './../../services/add-poi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from  '@angular/common/http';




@Component({
  selector: 'app-json-uploader',
  templateUrl: './json-uploader.component.html',
  styleUrls: ['./json-uploader.component.scss']
})
export class JsonUploaderComponent implements OnInit {



  constructor(private http: HttpClient,
    private cdn:AddPoiService) { }

    ngOnInit() {

    }

    image_only : boolean = false;

    multipleFiles:any

    save_ok:any = 0;


    msg : string = "";


    upload_error : number = 0;

    deleteData() // For deleting POI data
    {
        this.cdn.deletePOI().subscribe((val:any)=>{
          console.log(val);
        });
    }



    async onUpload(info:any) { // On upload event handler function

       await this.cdn.sendCDN(info.cdnUrl)
       .then( (res:any) : any=>{

        console.log(res);


        if(res==1) // If we have error in uploading in format
        {
              return Promise.reject(1); // reject the then chain and throw error
        }

        else if(res.hasOwnProperty('error')) // Error from backend
        {

              return Promise.reject(1);

        }

        this.upload_error = 0;

        this.msg = res.message;
        setTimeout( () => {
          this.msg="";
        },5000);
          return this.msg;

      })
      .catch((err:any)=>{

          return this.upload_error=err;

      })

    }



    onProgress(progress:any) {
      console.log('fired Event "onProgress with data:"');
      console.log(progress);
    }

    onChange(file:any) {
      if(!file) {
        return;
      }
      console.log('fired Event "onChange"');
    // input file parameter depends on "multiple-files" widget attribute
      if(this.multipleFiles) {
    //  file contains 2 methods:
    //  .promise() - returns the general promise for all uploaded files which resolves into an uploaded file group info
    //  .files() - returns an array of promises: one per each uploaded file. Each promise resolves into an uploaded file info
        console.log(file);
        if(file.promise) {
          file.promise().then((groupInfo:any) => {
            console.log('resolved general promise from "onChange" with data:');
            console.log(groupInfo);
          });
        }
        if(file.files) {
          file.files().forEach((promise:any) => {
            promise.then((fileInfo:any) => {
              console.log('resolves file promise with file info:');
              console.log(fileInfo);
            });
          });
        } else {
    // file contains uploaded file info
          console.log(file);
        }
      }
    }



}
