
# Create a quantum circuit with one qubit
qc = QuantumCircuit()

# Apply a Hadamard gate to the qubit
qc.h(0)

# Measure the qubit
qc.measure(0,0)

# Execute the circuit on a simulator
job = execute(qc, 'local_qasm_simulator')
result = job.result()

# Print the measurement results
print(result.get_counts())