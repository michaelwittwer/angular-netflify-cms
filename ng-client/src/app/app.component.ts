import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'

interface HomeContent{
  title: string
  subtitle: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngclient'

  homeContent: HomeContent

  constructor(httpClient: HttpClient){
    httpClient.get<HomeContent>('./site/content/pages/home.json')
      .subscribe(homeContent => this.homeContent = homeContent)
  }

  ngOnInit() {
    // TODO add server agnostic
    const win = <any>window
    if (win && win.netlifyIdentity) {
      win.netlifyIdentity.on('init', user => {
        if (!user) {
          win.netlifyIdentity.on('login', () => {
            win.location.href = '/admin/'
          })
        }
      })
    }
  }
}
