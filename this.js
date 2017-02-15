function Person()
{
  this.fullName='Rohan';
  this.fav="LOL";

  this.describe=function()
  {
    console.log(this.fullName+"Likes"+this.fav);
  };
}
var rohan=new Person();
rohan.describe();
