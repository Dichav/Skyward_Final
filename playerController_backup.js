#pragma strict

public var speed : float;
public var jumpHeight : float;
public var gravity : float;
private var targetRotation : int;
public var points: int = 0;
public var health: int = 100;
public var isDeath: boolean = false;

var checkX;
var checkY;
var checkZ;



//Disable Gravity
GetComponent.<Rigidbody>().useGravity = false;

function FixedUpdate() {
	//transform.position.z = 0;

	//Apply New Gravity
	GetComponent.<Rigidbody>().AddForce(new Vector3(0, -gravity*GetComponent.<Rigidbody>().mass, 0));

	//Handle Horz Movement
	GetComponent.<Rigidbody>().velocity.x = speed * Input.GetAxis("Horizontal");



if(health <= 0 && isDeath == false) {
	Dead();
	isDeath = true;
}

	else if( isDeath == false && Input.GetAxis("Horizontal") == 0) {
		GetComponent.<Animation>().CrossFade ("Dwarf Idle");
	} 

	// else if (health <= 0) {
	// GetComponent.<Animation>().CrossFade ("Dwarf_death");
	// }
	else
	{
		GetComponent.<Animation>().CrossFade ("Dwarf_run");
	}

	

		if(GetComponent.<Rigidbody>().velocity.x < 0) {
			//if we're moving to the left,
			targetRotation = 270; //set char to left.
		}

		else if(GetComponent.<Rigidbody>().velocity.x > 0) {
			//if we're moving to the right
			targetRotation = 90; //set char to right.
		}

		transform.eulerAngles.y-=(transform.eulerAngles.y-targetRotation)/5;

//handle jump
// if user hits jump key and we are on ground.

	if(Input.GetButton("Jump") && isGrounded()) {
		GetComponent.<Rigidbody>().velocity.y = jumpHeight;

	}

}

function Dead() {
	Debug.Log("yo yo yo");
	//Destroy(gameObject);
	 Application.LoadLevel ("main"); 

     //GetComponent.<Animation>().CrossFade ("Dwarf_death");
 }

//run a check to see if the player is on the ground.



function isGrounded() {

	var front : Vector3 = transform.position;
	front.x += 0.4;

	var middle : Vector3 = transform.position;

	var back : Vector3 = transform.position;
	back.x-= 0.4;

	//debug raycast

	var jumpLine : float = GetComponent.<Collider>().bounds.size.y/2 + 0.2;
	Debug.DrawRay (middle, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay (front, Vector3(0, -jumpLine, 0), Color.red);
	Debug.DrawRay (back, Vector3(0, -jumpLine, 0), Color.red);

	if(
	Physics.Raycast(front, Vector3.down, GetComponent.<Collider>().bounds.size.y/2 + 0.2) ||
	Physics.Raycast(middle, Vector3.down, GetComponent.<Collider>().bounds.size.y/2 + 0.2) ||
	Physics.Raycast(back, Vector3.down, GetComponent.<Collider>().bounds.size.y/2 + 0.2)
	){
	return true;
	}
	return false;
}		

function Start () {

checkX = transform.position.x;
checkY = transform.position.y;
checkZ = transform.position.z;

}

function Update () {

if (health <= 0) {
	health = 100;
	points = 0;

	transform.position.x = checkX;
	transform.position.y = checkY;
	transform.position.z = checkZ;

}
	// if health == 0;

}

function OnTriggerEnter(collision:Collider) {
 if (collision.gameObject.tag == "points"){
         points += 1;      
      	Debug.Log ("Points " + points);
      	Destroy (collision.gameObject);
      }

    	if (collision.gameObject.tag == "spike") {
		Debug.Log (health);
		health-=10;
	}

	    	if (collision.gameObject.tag == "blades") {
		Debug.Log (health);
		health-=100;
	}

	if (collision.gameObject.tag == "olaf") {
		Debug.Log (health);
		health-=15;
	}

	if (collision.gameObject.tag == "ghost") {
		Debug.Log (health);
		health-=10;
	}

	if(collision.gameObject.tag == "checkpoint") {
		checkX = transform.position.x;
		checkY = transform.position.y;
		checkZ = transform.position.z;
	}
}



	function OnTriggerStay(other:Collider){
    	if(other.gameObject.tag == "platform"){
   		transform.parent = other.transform;
   		Debug.Log ("Hello");
   		}
	}

	function OnTriggerExit(other:Collider){
   		if(other.gameObject.tag == "platform"){
   		transform.parent = null;
   		}
	}