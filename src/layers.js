var InputLayer = function(width, height, n_channels) {
    // Set defaults
    if (width === undefined)
        width = 16;
    if (height === undefined)
        height = 16;
    if (n_channels === undefined)
        n_channels = 1;

    this.type = "input";
    this.shape = [width, height, n_channels];

    // Define accessors
    Object.defineProperties(this, {
        width: {
            get: function() {return this.shape[0];},
            set: function(val) {this.shape[0] = val;}
        },
        height: {
            get: function() {return this.shape[1];},
            set: function(val) {this.shape[1] = val;}
        },
        n_channels: {
            get: function() {return this.shape[2];},
            set: function(val) {this.shape[2] = val;}
        }
    });
}

var ConvLayer = function(filter_size, depth, stride, padding) {
    if (filter_size === undefined)
        filter_size = [5, 5];
    if (depth === undefined)
        depth = 1;
    if (stride === undefined)
        stride = [1, 1, 1, 1];
    if (padding === undefined)
        padding = "same";

    this.type = "conv";
    this.filter_size = filter_size;
    this.depth = depth;
    this.stride = stride;
    this.padding = padding;

    Object.defineProperties(this, {
        filter_width: {
            get: function() {return this.filter_size[0];},
            set: function(val) {this.filter_size[0] = val;}
        },
        filter_height: {
            get: function() {return this.filter_size[1];},
            set: function(val) {this.filter_size[1] = val;}
        },
        stride_x: {
            get: function() {return this.stride[0];},
            set: function(val) {this.stride[0] = val;}
        },
        stride_y: {
            get: function() {return this.stride[1];},
            set: function(val) {this.stride[1] = val;}
        },
        stride_z: {
            get: function() {return this.stride[2];},
            set: function(val) {this.stride[2] = val;}
        },
        stride_t: {
            get: function() {return this.stride[3];},
            set: function(val) {this.stride[3] = val;}
        }
    });
}

var FullyConnectedLayer = function(output_size) {
    if (output_size === undefined)
        output_size = 10;

    this.type = "fully";
    this.output_size = output_size;
}

var PoolLayer = function(pool_type, window_size, stride, padding) {
    if (pool_type === undefined)
        pool_type = "max";
    if (window_size === undefined)
        window_size = [2, 2];
    if (stride === undefined)
        stride = [1, 1, 1, 1];
    if (padding === undefined)
        padding = "same";

    this.type = "pool";
    this.pool_type = pool_type;
    this.window_size = window_size;
    this.stride = stride;
    this.padding = padding;

    Object.defineProperties(this, {
        window_size_x: {
            get: function() {return this.window_size[0];},
            set: function(val) {this.window_size[0] = val;}
        },
        window_size_y: {
            get: function() {return this.window_size[1];},
            set: function(val) {this.window_size[1] = val;}
        },
        stride_x: {
            get: function() {return this.stride[0];},
            set: function(val) {this.stride[0] = val;}
        },
        stride_y: {
            get: function() {return this.stride[1];},
            set: function(val) {this.stride[1] = val;}
        },
        stride_z: {
            get: function() {return this.stride[2];},
            set: function(val) {this.stride[2] = val;}
        },
        stride_t: {
            get: function() {return this.stride[3];},
            set: function(val) {this.stride[3] = val;}
        }
    });
}

var ActivationLayer = function(activation_type) {
    if (activation_type === undefined)
        activation_type = "sigmoid";

    this.type = "activation";
    this.activation_type = activation_type;
}

var ClassificationLayer = function(classification_type) {
    if (classification_type === undefined)
        classification_type = "softmax";

    this.type = "classification";
    this.classification_type = classification_type;
}