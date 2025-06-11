import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member.model';
import { DatePipe } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-members-detail',
  standalone: true,
  imports: [DatePipe, TabsModule, GalleryModule],
  templateUrl: './members-detail.component.html',
  styleUrl: './members-detail.component.css'
})
export class MembersDetailComponent implements OnInit {
  private readonly memberService = inject(MembersService);
  private readonly route = inject(ActivatedRoute);
  member?: Member;
  galleryImages: GalleryItem[] = [];

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('id');
    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        member.photos.forEach(photo => {
          this.galleryImages.push(new ImageItem({ src: photo.url, thumb: photo.url }));
        })
      },
    })
  }

}
