This is the backend code.

It saves the data of all the hexagon shaped cities connected with border.


I used json data to store the values so that I can use hashing which makes it faster to check if the city added is already there or not.


Checking the neighbours of newly added city is also easier using json object because a city can have max of 6 neighbours.


I saved the neighbours as values and name of city ans key of json object.


For deleting we need to check if the node is deleted will the graph still be connected. This is done using graph breadh first search traversal technique.
we make a queue and insert the neighbour of node we have to delete and then check all neighbours of inserted node in queue pop the queue element repeat utill queue gets empty.



