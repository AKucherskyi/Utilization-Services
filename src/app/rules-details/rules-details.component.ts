import { Component, Input } from "@angular/core"
import { Rules } from "../shared/interfaces"

@Component({
    selector: 'app-rules-details',
    templateUrl: './rules-details.component.html',
    styleUrls: ['./rules-details.component.scss'],
})

export class RulesDetailsComponent {
    @Input() rules!: Rules 
}
