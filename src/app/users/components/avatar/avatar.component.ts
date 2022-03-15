import { UserService } from './../../services/user.services';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'app/services/auth-service';
export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'user-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: ElementRef;
  @Input() user: any;
  filePath!: string;
  userValue!: any;

  imagePath: any;
  imgSrc: any;
  isPreview = false;
  isSave = false;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userValue = this.authService.userValue;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.userValue = this.authService.userValue
  // }

  onSave() {
    this.isSave = !this.isSave;
    this.uploadFile();
    // window.location.reload();
  }

  onCancel() {
    this.isSave = false;
    this.isPreview = false;
  }

  onCancle() {}

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      console.log('change ne`');
      console.log(this.isPreview, 'trc');
      if (fileInput.files[0]) {
        this.file = {
          data: fileInput.files[0],
          inProgress: false,
          progress: 0,
        };
        this.isPreview = true;
        this.isSave = true;

        let reader = new FileReader();

        reader.onload = (_event: any) => {
          this.user.avatarUrl = _event.target.result;
          console.log(this.imgSrc, 'imgsrc');
        };
        console.log(this.isPreview, 'sau');
        reader.readAsDataURL(this.file.data);

        console.log(this.imgSrc, 'imgsrc');
      }
    };
    this.fileUpload.nativeElement.value = '';
  }

  async uploadFile() {
    const formData = new FormData();

    await formData.append('image', this.file.data);

    this.userService
      .updateAvatar(formData, this.userValue.id)
      .subscribe((data) => {
        return this.userService.findUserBy(this.userValue.id);
      });
  }
}
