#pragma strict

function Start () {
	Destroy (gameObject, 2);
}

function FixedUpdate () {
	//This can be used to fix the bomb to a Z position of 0 but it will push the dwarf back due to collision.
	//transform.position.z = 0;
}

function OnTriggerEnter(other:Collider) {
	if(other.tag == "enemy") {
		Destroy(other.gameObject);
		Destroy(gameObject);
	}
}