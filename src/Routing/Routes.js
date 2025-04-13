import React from "react"
import {Route, Switch } from "react-router-dom"
import { Registry } from "../Auth/Registry/Registry"
import { Login } from "../Auth/Login/Login"
import { Dashboard } from "../component/dashboard/Dashboard"
import { Posts } from "../component/posts/Posts"

import { Profiles } from "../component/profiles/create-profiles/Profiles"
import { Experience } from "../component/profiles/addExperience/Experience"
import { Education } from "../component/profiles/addEducation/Education"
import { Developers } from "../component/developers/Developers"
import { ViewProfile } from "../component/developers/Profile/viewProfile"
import { Discussion } from "../component/posts/Disscussion"
import { Discuss } from "../component/posts/Discuss"

export const Routes = () =>{
    return(
        <section className="container">
       
            <Switch>
                <Route exact path = '/registry' component = {Registry}/>
                <Route exact path = '/login' component = {Login}/>
                <Route exact path = '/developers' component = {Developers}/>
                <Route exact path = '/dashboard' component = {Dashboard}/>
                <Route exact path = '/posts' component = {Posts}/>
                <Route exact path = '/create-profiles' component = {Profiles}/>
                <Route exact path = '/addExperience' component = {Experience}/>
                <Route exact path = '/addEducation' component = {Education}/>
                <Route exact path = '/viewProfile' component = {ViewProfile}/>
                <Route exact path = '/discussion' component = {Discussion} />
                {/* <Route exact path = '/posts/:id' component = {Disscuss} /> */}
            </Switch>
       
        </section>
        
    )
}