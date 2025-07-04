function TitleComponent(){
    /**return component for application's title card */
    return(<div className="flex-flex-col text-center items-center space-y-0 mt-4 m-b-0 ">
        <div id='title-container' className="flex flex-row text-7xl px-25">
        <h1 id= 'appName1' className="font-light font-stretch-extra-expanded text-indigo-200 dark:text-slate-400">Do.</h1>
        <h1 id= 'appName2' className="font-stretch-extra-condensed font-extrabold text-violet-900 tracking-tighter  dark:text-pink-400">NEXT</h1>
        </div>
        <p id='blurb' className="font-extralight text-sm text-zinc-800 italic dark:text-slate-400">
            Stay organized with the most sleek and  <br></br>
           easy to use task management application!
        </p>
    </div>);

}
export default TitleComponent;