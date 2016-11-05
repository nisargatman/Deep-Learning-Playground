import tensorflow as tf
import numpy as np
import json
import os
from Network import Network


neural_network = Network()
def main():
    if os.getcwd() != "C:\Users\Nisarg\Desktop\Deep-Learning-Playground\json": # directory of json files
        os.chdir("C:\Users\Nisarg\Desktop\Deep-Learning-Playground\json") # check if functioning in same directory as json files

    with open('nn.json') as f:
        model_def = json.load(f)
    layers = model_def["layers"] # dictionary with information of each layer
    
    NUM_LAYERS = len(model_def)

    input_shape = layers[0]["shape"]
    input = get_input(input_shape)
    
    for i in range(NUM_LAYERS):
        if layers[i]["type"] == "conv":
            # construct the filter shape and dimensions
            weight_initializer = layers[1]["weight_initializer"]
            bias_initializer = layers[1]["bias_initializer"]
            weight = weight_variable(SHAPE,weight_initializer["type"], METADATA) # SHAPE is a variable that needs to be formualated from previous data found, metadata contains things like standard deviation, etc if needed
            bias = bias_variable(SHAPE, bias_initializer["type"], METADATA)
            # do neural_network.insert(tf.nn.conv2d)
        elif layers[i]["type"] == "activation":
            activation_type = layers[i]["activation_type"]
            # do neural_netowrk.insert(tf.nn.relu / whatever else)
        elif layers[i]["type"] == "pool":
            pool_type = layers[i]["pool_type"]
            # do neural_network.insert(tf.nn.max_pool)
    
def get_input(input_shape):
    # for now return 0s of shape input shape
    return tf.zeros(input_shape,dtype=tf.float32) # ensure from tf documentation if this is correct
    
def weight_variable(shape,type,metadata): # in these two functions type is pseudocode for whatever type of initialiser is used - maybe can create a new class to define this cleanly
    return tf.Variable(type(shape,metadata))

def bias_variable(shape,type,metadata):
    return tf.Varaible(type(shape,metadata))
   
   
if __name__ == "__main__":
    main()