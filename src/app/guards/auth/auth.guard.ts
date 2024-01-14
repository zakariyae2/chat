import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanLoad, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { AutheticationService } from 'src/app/authetication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService:AutheticationService,
    private router:Router
    ){}
  async canLoad(): Promise<boolean>{
    try{
      const user = await this.authService.checkAuth();

      console.log(user);
      if(user){
        return true;
      }
      else{
        this.navigate('/home');
        return false;
      }
    }
    catch(e){
      console.log(e);
      this.navigate('/home');
      return false;
    }
  }
  navigate(url:any){
    this.router.navigateByUrl(url, {replaceUrl: true});
  }
  }
  

