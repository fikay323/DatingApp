import { Component, HostListener, ViewChild } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/member.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, NgForm } from '@angular/forms';
import { Member } from '../../_models/member.model';
import { User } from '../../_models/user.model';
import { CommonModule, DatePipe } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [DatePipe, TabsModule, FormsModule, CommonModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent {
   @ViewChild('editForm') editForm?: NgForm;
  member!: Member;
  user: User | null;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private readonly accountService: AccountService, 
    private readonly memberService: MembersService, 
    private readonly toastr: ToastrService
  ) { 
    this.user = this.accountService.currentUser();
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.user!.username.toLocaleLowerCase()).subscribe(member => {
      this.member = member;
    })
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      this.editForm?.reset(this.member);
    })
  }
}
