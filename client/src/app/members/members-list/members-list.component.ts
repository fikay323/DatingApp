import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/member.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-members-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.css'
})
export class MembersListComponent implements OnInit {
  readonly memberService = inject(MembersService);

  ngOnInit(): void {
    this.memberService.members().length === 0 && this.memberService.getMembers();
  }

}
