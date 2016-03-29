#pragma strict

public var bomb: Rigidbody;
private var speed : float = 8.0;
private var delay : int = 0;

function Start () {

}

function Update () {
	if(delay > 0) {
		delay--;	
	}
	
	if (Input.GetButtonDown("Fire1")) {
		if(delay == 0) {	        
	        var bombClone: Rigidbody = Instantiate(bomb, transform.position, transform.rotation);
	        bombClone.velocity = transform.forward * speed;
	        delay = 100;
        }
	}
}
