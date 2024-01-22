import { Injectable } from '@angular/core';
import {
  Storage,
  fromTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storage: Storage) {}

  uploadFile(
    filePath: string,
    file: File,
  ): Observable<{
    progress: number;
    downloadUrl?: string;
  }> {
    const fileRef = ref(this.storage, filePath);
    const task = uploadBytesResumable(fileRef, file);

    return fromTask(task).pipe(
      switchMap((snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (snapshot.state === 'success') {
          return from(getDownloadURL(fileRef)).pipe(
            map((downloadUrl) => {
              return {
                progress: progress,
                downloadUrl: downloadUrl,
              };
            }),
          );
        }
        return of({ progress: progress });
      }),
    );
  }
}
